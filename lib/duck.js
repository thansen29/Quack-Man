import MovableObject from './movable_object';

class QuackMan extends MovableObject {
  constructor(ctx, x, y, width, height){
    super(ctx, x, y, width, height);
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width - 3;
    this.height = height - 3;
    this.loadDucks();
    this.lastDuck = this.rightDuck;
    this.direction = [0, 0];
    this.nextDirection = null;
    this.speed = 3;
  }


  draw(direction){
    if(direction[0] === 1){
      this.lastDuck = this.rightDuck;
    } else if(direction[0] === -1){
      this.lastDuck = this.leftDuck;
    } else if(direction[1] === 1){
      this.lastDuck = this.downDuck;
    } else if(direction[1] === -1){
      this.lastDuck = this.upDuck;
    } else {
      this.lastDuck;
    }
    // this.ctx.fillStyle = "blue";
    // this.ctx.beginPath();
    // this.ctx.arc(this.x+this.width/2, this.y+this.height/2, this.height/2, 0, Math.PI*2 );
    // this.ctx.fill();
    this.ctx.drawImage(this.lastDuck, this.x, this.y, this.width, this.height);
  }

  loadDucks(){
    this.rightDuck = new Image();
    this.rightDuck.src = "./assets/rightduck.png";

    this.leftDuck = new Image();
    this.leftDuck.src = "./assets/leftduck.png";

    this.upDuck = new Image();
    this.upDuck.src = "./assets/upduck.png";

    this.downDuck = new Image();
    this.downDuck.src = "./assets/downduck.png";

  }
}

export default QuackMan;
