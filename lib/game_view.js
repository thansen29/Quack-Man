import QuackMan from './duck';

class GameView {
  constructor(ctx, game){
    this.ctx = ctx;
    this.game = game;
    // this.beginGame = this.beginGame.bind(this);
    this.countdown = this.countdown.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.count = 4;
    this.gameMuted = false;
    this.paused = false;
    this.preGame = true;
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
    let pos = [0, 0];
    switch (e.keyCode) {
      case 40:
        pos[1] = 1;
        break;
      case 39:
        pos[0] = 1;
        break;
      case 38:
        pos[1] = -1;
        break;
      case 37:
        pos[0] = -1;
        break;
      case 83:
        this.toggleSound();
        break;
      case 32:
        this.togglePause();
        break;
      default:
    }

    this.game.changeDirection(pos);
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
      this.lastTime = time;
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  countdown(){
    this.game.draw();
    this.ctx.fillText(`Loading...`, 250, 300);
    this.timer = window.setInterval(() => {
      this.game.draw();
      this.ctx.fillText(`Starting in  ${this.count}`, 200, 300);
      if(this.count === 0){
        window.clearInterval(this.timer);
        this.beginGame();
      }
      this.count -= 1;
    }, 1000);
  }

  //TODO: make it not error while still working
  //issues: stops movement when toggling sound.
  toggleSound(e){
    const audio = document.getElementById("intro");
    if(this.preGame && e.keyCode === 83){
      if(!this.gameMuted){
        this.playAudio(audio);
      } else {
        this.pauseAudio(audio);
      }
    } else if(!this.preGame){
      if(!this.gameMuted){
        this.playAudio(audio);
      } else {
        this.pauseAudio(audio);
      }
    }
  }

  playAudio(audio){
    this.gameMuted = true;
    audio.muted = false;
    audio.play();
  }

  pauseAudio(audio){
    this.gameMuted = false;
    audio.muted = true;
    audio.pause();
  }

}

export default GameView;
