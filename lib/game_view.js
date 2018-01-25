import QuackMan from './duck';

class GameView {
  constructor(ctx, game){
    this.ctx = ctx;
    this.game = game;
    // this.beginGame = this.beginGame.bind(this);
    this.countdown = this.countdown.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.count = 4;
    this.gameMuted = true;
    this.paused = false;
    this.preGame = true;
    this.lastDir = [0, 0];
  }

  bindMoveHandler(){
    window.addEventListener("keydown", this.moveSprite.bind(this), false);
  }

  bindSoundHandler(){
    window.addEventListener("keydown", this.toggleSound, false);
  }

  bindClickHandler(){
    window.addEventListener("click", this.countdown, false);
  }

  moveSprite(e){
    //r is 82
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

    // this.game.moveQuackMan(this.lastDir);
    this.game.changeDirection(this.lastDir);
  }

  togglePause(){
    this.paused = !this.paused;
    this.ctx.fillText(`Paused`, 250, 300);
    requestAnimationFrame(this.animate.bind(this));
  }

  //TODO: make this font actually work
  start(){
    this.bindSoundHandler();
    this.game.draw();
    this.ctx.fillStyle = "yellow";
    this.ctx.font = "24px PressStart";
    this.ctx.fillText("Click anywhere to begin the game", 150, 300);
    this.bindClickHandler();
  }

  beginGame(){
    window.removeEventListener("click", this.beginGame, false);
    window.removeEventListener("keydown", this.toggleSound, false);
    this.preGame = false;

    this.bindMoveHandler();
    //call method that will make the ghosts start moving
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    if(!this.paused){
      const timeDelta = time - this.lastTime;
      this.game.draw();
      // this.game.moveGhosts();
      this.lastTime = time;
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  countdown(){
    window.removeEventListener("click", this.countdown, false);
    this.game.draw();
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(`Loading...`, 250, 300);
    this.ctx.fill();
    this.timer = window.setInterval(() => {
      this.game.draw();
      this.ctx.fillStyle = "yellow";
      this.ctx.fillText(`Starting in  ${this.count}`, 200, 300);
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
