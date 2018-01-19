import MovableObject from './movable_object';

class QuackMan extends MovableObject {
  constructor(ctx, x, y, width, height){
    super(ctx, x, y, width, height);
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width - 3;
    this.height = height - 3;

    this.vel = [0, 0];
  }


  draw(){
    const duck = new Image();
    duck.src = "./assets/duck.png";
    this.ctx.drawImage(duck, this.x, this.y, this.width, this.height);
  }

  moveTo(pos){
    this.pos = pos;
  }
}

export default QuackMan;
