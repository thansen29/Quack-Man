import VisibleObject from './visible_object';

class QuackMan extends VisibleObject {
  constructor(ctx, x, y, width, height){
    super(ctx, x, y, width, height);
  }

  draw(){
    const duck = new Image();
    duck.src = "./assets/duck.png";
    // this.ctx.drawImage(duck, 345, 420, 40, 40);
    this.ctx.drawImage(duck, this.x, this.y, this.width, this.height);
  }
}

export default QuackMan;
