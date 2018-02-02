import Wall from './wall';
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
    this.vulnerable = true;
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

    this.ctx.drawImage(this.lastDuck, this.x, this.y, this.width, this.height);
    this.ctx.fill();
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

  changeDirection(direction){
    if(direction[0] === this.direction[0] &&
      direction[1] === this.direction[1])
      return;

    this.nextDirection = direction;
  }

  actuallyChangeDirection(grid, squareWidth, squareHeight){
    if(!this.nextDirection) return;

    const center = this.calculateCurrentCenter();
    const quackCenterX = center.x;
    const quackCenterY = center.y;

    const currentLocation = this.calculateMatrixPos(quackCenterX, quackCenterY, squareWidth, squareHeight);
    const currentGridX = currentLocation.gridX;
    const currentGridY = currentLocation.gridY;

    const nextCenter = this.calculateNextCenter(currentGridX, currentGridY, squareWidth, squareHeight);
    const nextCenterX = nextCenter.x;
    const nextCenterY = nextCenter.y;

    const nextGridX = currentGridX + this.nextDirection[0];
    const nextGridY = currentGridY + this.nextDirection[1];
    if(grid.length >= nextGridX &&
       grid[0].length >= nextGridY){
        const nextCell = grid[nextGridY][nextGridX];
        if(!(nextCell instanceof Wall)) {

          if(this.notInverseDirection()) {
            if (this.smoothMovement(quackCenterX, quackCenterY, nextCenterX, nextCenterY)) {
              return;
            }

            this.x = currentGridX * squareWidth + (squareWidth - this.width) / 2;
            this.y = currentGridY * squareHeight + (squareHeight - this.height) / 2;
          }
          this.direction = this.nextDirection;
          this.nextDirection = null;
        }
    }
  }


}

export default QuackMan;
