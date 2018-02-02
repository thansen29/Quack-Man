import Wall from './wall';
import MovableObject from './movable_object';
import _ from 'lodash';

let randDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];

class Ghost extends MovableObject {
  constructor(ctx, x, y, width, height){
    super(ctx, x, y, width, height);
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width - 3;
    this.height = height - 3;
    this.eatable = false;
    this.direction = [0, 0];
    this.nextDirection = [0, -1];
    this.eaten = false;
    this.speed = 1.5;
    this.vulnerable = false;
  }

  getRandomDirection(){
    randDirections = _.shuffle(randDirections);
    const newDirection = randDirections[Math.floor(Math.random()*randDirections.length)];
    if(this.direction[0] === newDirection[0] &&
       this.direction[1] === newDirection[1]){
         return;
    } else {
        this.nextDirection = [1, 0];
    }
    if((this.direction[0] + newDirection[0] === 0) &&
       (this.direction[1] + newDirection[1] === 0)){
         this.getRandomDirection();
     } else {
       this.nextDirection = newDirection;
     }
  }

  flicker(){
    window.setTimeout(() => {
      this.eatable = false;
    }, 3000);
    window.setTimeout(() => {
      this.eatable = false;
    }, 3100);
    window.setTimeout(() => {
      this.eatable = false;
    }, 3200);
    window.setTimeout(() => {
      this.eatable = true;
    }, 3300);
    window.setTimeout(() => {
      this.eatable = false;
    }, 3400);
    window.setTimeout(() => {
      this.eatable = true;
    }, 3500);
    window.setTimeout(() => {
      this.eatable = false;
    }, 3600);
    window.setTimeout(() => {
      this.eatable = true;
    }, 3700);
    window.setTimeout(() => {
      this.eatable = false;
    }, 3800);
    window.setTimeout(() => {
      this.eatable = true;
    }, 3900);
    window.setTimeout(() => {
      this.eatable = false;
      this.vulnerable = false;
      //dont make vuln and eatable here, vuln and eatable once reached homebase
    }, 4000);
  }

  changeGhostDirection(grid, squareWidth, squareHeight){
    if(!this.nextDirection) return;

    const center = this.calculateCurrentCenter();
    const ghostX = center.x;
    const ghostY = center.y;

    const currentLocation = this.calculateMatrixPos(ghostX, ghostY, squareWidth, squareHeight);
    const currentGridX = currentLocation.gridX;
    const currentGridY = currentLocation.gridY;

    const nextCenter = this.calculateNextCenter(currentGridX, currentGridY, squareWidth, squareHeight);
    const nextCenterX = nextCenter.x;
    const nextCenterY = nextCenter.y;

    const nextX = currentGridX + this.nextDirection[0];
    const nextY = currentGridY + this.nextDirection[1];
    if(grid.length >= nextX &&
        grid[0].length >= nextY){
          const nextCell = grid[nextY][nextX];
          if(!(nextCell instanceof Wall)){
              if(this.notInverseDirection()) {
                if (this.smoothMovement(ghostX, ghostY, nextCenterX, nextCenterY)) {
                  return;
                }
                this.x = currentGridX * squareWidth + (squareWidth - this.width) / 2;
                this.y = currentGridY * squareHeight + (squareHeight - this.height) / 2;
              }
            this.direction = this.nextDirection;
        } else {
            this.getRandomDirection();
        }
    }
  }



}

export default Ghost;
