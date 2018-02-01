import QuackMan from './duck';
import Board from './board';
import boardModel from './board_model.js';
import Game from './game';
import Database from './database';
import _ from 'lodash';

class GameView {
  constructor(ctx, game){
    this.ctx = ctx;
    this.game = game;
    // this.beginGame = this.beginGame.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.moveSprite = this.moveSprite.bind(this);
    this.addScore = this.addScore.bind(this);
    this.count = 4;
    this.gameMuted = true;
    this.paused = false;
    this.preGame = true;
    this.lastDir = [0, 0];
    this.highscores = [];
  }

  bindMoveHandler(){
    window.addEventListener("keydown", this.moveSprite, false);
  }

  bindSoundHandler(){
    window.addEventListener("keydown", this.toggleSound, false);
  }

  bindClickHandler(){
    window.addEventListener("click", this.countdown, false);
  }

  moveSprite(e){
    switch (e.keyCode) {
      case 40:
        this.lastDir = [0, 1];
        break;
      case 39:
        this.lastDir = [1, 0];
        break;
      case 38:
        this.lastDir = [0, -1];
        break;
      case 37:
        this.lastDir = [-1, 0];
        break;
      case 83:
        this.toggleSound();
        break;
      case 32:
        this.togglePause();
        break;
      default:
    }

    this.game.changeDirection(this.lastDir);
  }

  togglePause(){
    this.paused = !this.paused;
    this.ctx.fillText(`Paused`, 250, 300);
    requestAnimationFrame(this.animate.bind(this));
  }

  start(){
    this.bindSoundHandler();
    this.game.draw();
    this.ctx.fillStyle = "yellow";
    this.ctx.font = "18px PressStart";
    this.ctx.fillText("Click anywhere to begin the game", 10, 300);
    this.bindClickHandler();
    this.fetchScores();
  }

  beginGame(){
    window.removeEventListener("click", this.beginGame, false);
    window.removeEventListener("keydown", this.toggleSound, false);
    this.preGame = false;
    this.game.drawGhosts();

    this.bindMoveHandler();

    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    if(!this.paused){
      const timeDelta = time - this.lastTime;
      if(this.game.gameOver()){
        this.gameOver();
      } else {
        if(this.game.restartGame()){
          window.removeEventListener("keydown", this.moveSprite, false);
          this.startNewRound();
        } else if(this.game.roundOver()){
          this.startNewLevel();
        } else if(this.game.getPoints()){
            this.paused = true;
            window.setTimeout(() => {
              this.paused = false;
              requestAnimationFrame(this.animate.bind(this));
            }, 200);
        } else {
          this.game.draw();
          this.game.moveGhosts();
          this.lastTime = time;
          requestAnimationFrame(this.animate.bind(this));
        }
      }
    }
  }

  gameOver(){
    window.removeEventListener("click", this.startNewGame, false);
    this.ctx.font = "18px PressStart";
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(`Game Over`, 220, 300);
    this.ctx.fill();
    window.addEventListener("keydown", this.addScore, false);
    window.removeEventListener("keydown", this.moveSprite, false);
    const container = $('.name-container');
    container.attr('style', "display: flex");
  }

  fetchScores(){
    let scoreResults = Database.ref("scores");
    const highscores = [];
    scoreResults.on('value', (snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        this.highscores.push(childSnapshot.val());
      }.bind(this));
    }).bind(this);

    const delay = (() => setTimeout( this.sortScores.bind(this), 1000));
    delay();
  }

  sortScores(){
    const scores = [];
    this.highscores.forEach((highscore) => {
      scores.push(_.values(highscore));
    });
    scores.sort((function(index){
        return function(a, b){
            return (a[index] === b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
        };
    })(1));
    this.displayScores(scores);
  }

  displayScores(scores){
    const list = $('.highscores');
    let initials;
    let points;
    const highscores = scores.slice(0, 5);
    highscores.forEach((score) => {
      initials = score[0].toUpperCase();
      points = score[1];
      const li = $('<li>');
      li.append(`${initials}: ${points}`);
      list.append(li);
    });
  }

  addScore(e){
    if(e.keyCode === 13){
      const score = this.game.getScore();
      const initials = $('.name-input').val();
      Database.ref("scores").push({
        initials,
        score
      });
      const container = $('.name-container');
      container.attr('style', "display: none");
      this.ctx.fillText("Click anywhere for a new game", 30, 340);
      this.ctx.fill();
      window.addEventListener("click", this.startNewGame, false);

      window.removeEventListener("keypress", this.addScore, false);
    }
  }

  startNewRound(){
    this.ctx.font = "18px PressStart";
    this.game.updateLives();
    window.setTimeout(() => {
      this.game.setDefaultPositions();
      this.countdown();
    }, 500);
  }

  startNewLevel(){
    this.ctx.font = "18px PressStart";
    let level = this.game.getLevel() - 1;
    if(level >= 3){
      level = 0;
    }
    const model = boardModel[level];
    const lives = this.game.getLives();
    const score = this.game.getScore();
    const board = Board.fromString(this.ctx, model);
    const game = new Game(board, score, lives, level);
    const gameView = new GameView(this.ctx, game);
    // let newLives = game.lives;
    // let newScore = game.score;
    // let newLevel = game.level + 1;
    // this.game.setLives(newLives);
    // this.game.setScore(newScore);
    // this.game.setLevel(newLevel);
    gameView.countdown();
  }

  startNewGame(){
    this.ctx.font = "18px PressStart";
    const board = Board.fromString(this.ctx, boardModel[0]);
    const game = new Game(board);
    const gameView = new GameView(this.ctx, game);
    $('.highscores li').remove();
    gameView.start();
  }

  countdown(){
    if(this.game.lives){
      let newLives = this.game.lives;
      let newScore = this.game.score;
      let newLevel = this.game.level + 1;
      this.game.setLives(newLives);
      this.game.setScore(newScore);
      this.game.setLevel(newLevel);
    }
    this.count = 4;
    window.removeEventListener("click", this.countdown, false);
    window.removeEventListener("click", this.startNewGame, false);
    this.game.draw();
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(`Loading...`, 210, 310);
    this.ctx.fill();
    this.timer = window.setInterval(() => {
      this.game.draw();
      this.ctx.fillStyle = "yellow";
      this.ctx.fillText(`Starting in ${this.count}`, 180, 310);
      if(this.count === 0){
        window.clearInterval(this.timer);
        this.beginGame();
      }
      this.ctx.fill();
      this.count -= 1;
    }, 1000);
    this.ctx.fill();
  }

  toggleSound(e){
    const audio = document.getElementById("intro");
    if(this.preGame && e.keyCode === 83){
      if(this.gameMuted){
        this.playAudio(audio);
      } else {
        this.pauseAudio(audio);
      }
    } else if(!this.preGame){
      if(this.gameMuted){
        this.playAudio(audio);
      } else {
        this.pauseAudio(audio);
      }
    }
  }

  playAudio(audio){
    this.gameMuted = false;
    audio.muted = false;
    audio.volume = .3;
    audio.play();
    this.game.toggleSound(this.gameMuted);
  }

  pauseAudio(audio){
    this.gameMuted = true;
    audio.muted = true;
    audio.pause();
    this.game.toggleSound(this.gameMuted);
  }

}

export default GameView;
