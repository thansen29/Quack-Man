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
    //s is 83
    // debugger
    let pos = [0, 0];
    // let toggleSound;
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
      default:
    }
    // if(toggleSound){
    //   this.toggleSound();
    // }

    this.game.changeDirection(pos);
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

    this.bindMoveHandler();
    //call method that will make the ghosts start moving
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;
    this.game.draw();
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
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

  toggleSound(e){
    if(e.keyCode === 83){
      const audio = document.getElementById("intro");
      if(!this.gameMuted){
        this.gameMuted = true;
        audio.muted = false;
        audio.play();
      } else {
        this.gameMuted = false;
        audio.muted = true;
        audio.pause();
      }
    }
  }

}

export default GameView;
