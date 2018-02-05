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
    this.path = [];
  }

  move(board, grid, squareWidth, squareHeight, quackMan){
    this.changeGhostDirection(grid, squareWidth, squareHeight);
    const startX = this.x;
    const startY = this.y;
    this.x += this.direction[0] * this.speed;
    this.y += this.direction[1] * this.speed;
    let finalPos = this.calculateMatrixPos(startX, startY, squareWidth, squareHeight);

    const offsetX = (squareWidth - this.width) / 2;
    const offsetY = (squareHeight - this.height) / 2;

    if(this.wallCollision(grid)){
      this.x = finalPos.x + offsetX;
      this.y = finalPos.y + offsetY;
      this.getRandomDirection();
    }

    this.wrap(this.x, this.y);
    this.quackCollision(board, quackMan);
    this.draw();
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
    this.vulnerable = true;
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

  makeEatable(){
    this.vulnerable = true;
    this.eatable = true;
    this.flicker();
  }

  //TODO: fix that they are not dangerous while blinking
  //theyre not staying eyes after they get eaten
  quackCollision(board, quackMan){
    if(this.collidesWith(quackMan) && this.vulnerable){
      quackMan.eatGhost(board, this);
    } else if(this.collidesWith(quackMan) && !this.eatable){
      quackMan.killSelf(board);
      return;
    }
  }

  findShortestPath(startX, startY, endX, endY, grid){
    const distanceFromTop = startY;
    const distanceFromLeft = startX;
    const visits = [];
    for (let i = 0; i < grid.length; i++) {
      visits[i] = grid[i].slice();
    }

    const location = {
      distanceFromTop,
      distanceFromLeft,
      path: [],
      status: null
    };

    const queue = [location];

    while(queue.length > 0){
      let currentLocation = queue.shift();

      let newLocation = this.checkDirection(currentLocation, 'up', grid, endX, endY, visits);
      if(newLocation.status === 'goal'){
        return newLocation.path;
      } else if(newLocation.status === 'valid'){
        queue.push(newLocation);
      }

      newLocation = this.checkDirection(currentLocation, 'right', grid, endX, endY, visits);
      if(newLocation.status === 'goal'){
        return newLocation.path;
      } else if(newLocation.status === 'valid'){
        queue.push(newLocation);
      }

      newLocation = this.checkDirection(currentLocation, 'down', grid, endX, endY, visits);
      if(newLocation.status === 'goal'){
        return newLocation.path;
      } else if(newLocation.status === 'valid'){
        queue.push(newLocation);
      }

      newLocation = this.checkDirection(currentLocation, 'left', grid, endX, endY, visits);
      if(newLocation.status === 'goal'){
        return newLocation.path;
      } else if(newLocation.status === 'valid'){
        queue.push(newLocation);
      }

    }
    return false;
  }

  checkDirection(currentLocation, direction, grid, endX, endY, visits){
    const newPath = currentLocation.path.slice();
    newPath.push(direction);

    let top = currentLocation.distanceFromTop;
    let left = currentLocation.distanceFromLeft;

    switch (direction) {
      case 'up':
        top -= 1;
        break;
      case 'right':
        left += 1;
        break;
      case 'down':
        top += 1;
        break;
      case 'left':
        left -= 1;
        break;
      default:
    }

    const newLocation = {
      distanceFromTop: top,
      distanceFromLeft: left,
      path: newPath,
      status: 'unknown'
    };
    newLocation.status = this.locationStatus(newLocation, endX, endY, grid, visits);

    if(newLocation.status === 'valid'){
      visits[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'visited';
    }

    return newLocation;
  }

  locationStatus(location, endX, endY, grid, visits){
    const length = visits.length;
    let top = location.distanceFromTop;
    let left = location.distanceFromLeft;


    if(left < 0 ||
       left >= length ||
       top < 0 ||
       top >= length){
        return 'invalid';
    } else if(top === endY && left === endX){
      return 'goal';
    } else if(visits[top][left] instanceof Wall || visits[top][left] === 'visited'){
      return 'blocked';
    } else {
      return 'valid';
    }
  }


}

export default Ghost;
