import QuackMan from './duck';

class GameView {
  constructor(ctx, game){
    this.ctx = ctx;
    this.game = game;
    // this.beginGame = this.beginGame.bind(this);
    this.countdown = this.countdown.bind(this);
    this.count = 5;
  }

  bindKeyHandler(){
    window.addEventListener("keydown", this.moveSprite.bind(this), false);
  }

  bindClickHandler(){
    window.addEventListener("click", this.countdown, false);
  }

  moveSprite(e){
    //s is 83
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
      default:
    }

    this.game.changeDirection(pos);
  }

  //TODO: make this font actually work
  start(){
    this.game.draw();
    this.ctx.fillStyle = "yellow";
    this.ctx.font = "24px PressStart";
    this.ctx.fillText("Click anywhere to begin the game", 150, 300);
    this.bindClickHandler();
  }

  beginGame(){
    window.removeEventListener("click", this.beginGame, false);

    this.bindKeyHandler();
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

}

export default GameView;
