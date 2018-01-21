import MovableObject from './movable_object';

class QuackMan extends MovableObject {
  constructor(ctx, x, y, width, height){
    super(ctx, x, y, width, height);
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width - 3;
    this.height = height - 3;
    this.lastDirection = "./assets/rightduck.png";
  }


  draw(direction){
    const duck = new Image();
    if(direction[0] === 1){
      this.lastDirection = "./assets/rightduck.png";
      duck.src = this.lastDirection;
    } else if(direction[0] === -1){
      this.lastDirection = "./assets/leftduck.png";
      duck.src = this.lastDirection;
    } else if(direction[1] === 1){
      this.lastDirection = "./assets/downduck.png";
      duck.src = this.lastDirection;
    } else if(direction[1] === -1){
      this.lastDirection = "./assets/upduck.png";
      duck.src = this.lastDirection;
    } else {
      duck.src = this.lastDirection;
    }

    this.ctx.drawImage(duck, this.x, this.y, this.width, this.height);
  }
}

export default QuackMan;
