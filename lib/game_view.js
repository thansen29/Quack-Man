import QuackMan from './duck';

class GameView {
  constructor(ctx, game){
    this.ctx = ctx;
    this.game = game;
    this.beginGame = this.beginGame.bind(this);
  }

  bindKeyHandlers(){
    window.addEventListener("keydown", this.moveSprite.bind(this), false);
    window.addEventListener("click", this.beginGame, false);
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

  start(){
    this.bindKeyHandlers();
    this.game.draw();

  }

  beginGame(){
    window.removeEventListener("click", this.beginGame, false);
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;
    this.game.draw();
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
