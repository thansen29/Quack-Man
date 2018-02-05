import Wall from './wall';
import Ghost from './ghost';

class Blinky extends Ghost {
  draw(){
    if(!this.eatable){
      const ghostImg = new Image();
      ghostImg.src = `./assets/blinky.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
      this.speed = .8;
      // this.speed = 1.25;
    } else {
      if(this.eaten){
        this.speed = 3;
        const ghostImg = new Image();
        ghostImg.src = `./assets/eyes.png`;
        this.ctx.drawImage(ghostImg, this.x, this.y, this.width/2, this.height/2);
        return;
      }
      const ghostImg = new Image();
      this.speed = .8;
      ghostImg.src = `./assets/eatable.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
    }
  }

  move(board, grid, squareWidth, squareHeight, quackMan){
    const grids = this.calculateMatrixPos(this.x, this.y, this.width, this.height);
    const startX = grids.gridX;
    const startY = grids.gridY - 1;
    const quacks = quackMan.calculateMatrixPos(quackMan.x, quackMan.y, quackMan.width, quackMan.height);
    const endX = quacks.gridX;
    const endY = quacks.gridY - 1;

    let path = this.findShortestPath(startX, startY, endX, endY, grid);
    console.log(path);

    const direction = path[0];
      switch (direction) {
        case 'up':
          this.direction = [0, -1];
          // this.nextDirection = [0, -1];
          break;
        case 'right':
          this.direction = [1, 0];
          // this.nextDirection = [1, 0];
          break;
        case 'down':
          this.direction = [0, 1];
          // this.nextDirection = [0, 1];
          break;
        case 'left':
          this.direction = [-1, 0];
          // this.nextDirection = [-1, 0];
          break;
        default:
      }
      // this.changeGhostDirection(grid, squareWidth, squareHeight);
    // const startingX = this.x;
    // const startingY = this.y;
    this.x += this.direction[0] * this.speed;
    this.y += this.direction[1] * this.speed;

    // let finalPos = this.calculateMatrixPos(startingX, startingY, squareWidth, squareHeight);
    // const offsetX = (squareWidth - this.width) / 2;
    // const offsetY = (squareHeight - this.height) / 2;


    // if(this.wallCollision(grid)){
    //   this.x = finalPos.x + offsetX;
    //   this.y = finalPos.y + offsetY;
      // debugger
      // this.findShortestPath(startX, startY, endX, endY, grid);
      // this.getNextDirection(grid, squareWidth, squareHeight);
    // }

    this.wrap(this.x, this.y);
    this.quackCollision(board, quackMan);
    this.draw();
  }

  getNextDirection(grid, squareWidth, squareHeight){
    // debugger
    this.path.slice(1);
    this.changeGhostDirection(grid, squareWidth, squareHeight);
  }

  changeGhostDirection(grid, squareWidth, squareHeight){
    // debugger
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
        }
    }
  }
}

export default Blinky;
