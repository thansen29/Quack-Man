import LargePill from './large_pill';
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

  move(board, grid, squareWidth, squareHeight, dots, ghosts){
    this.actuallyChangeDirection(grid, squareWidth, squareHeight);

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
      this.direction = [0, 0];
    }

    this.wrap(this.x, this.y);
    this.draw(this.direction);
    this.eatPill(board, dots, squareWidth, squareHeight, ghosts);
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

  eatGhost(board, ghost){
    const intro = document.getElementById('intro');
    const eatGhost = document.getElementById('eatghost');
    intro.pause();
    if(!board.muted){
      intro.volume = .3;
      eatGhost.volume = .3;
      eatGhost.play();
      intro.play();
    }
    if(ghost.vulnerable){
      board.getPoints = true;
      window.setTimeout(() => {
        board.getPoints = false;
      }, 200);
      board.score += 200;
      ghost.eaten = true;
      // ghost.vulnerable = true;
      this.ctx.font = '12px PressStart';
      this.ctx.fillText("200", this.x, this.y - 5);
      window.setTimeout(() => {
        ghost.eaten = false;
        // ghost.vulnerable = true;
      }, 2000);
      ghost.vulnerable = false;
    }
  }

  killSelf(board){
    const death = document.getElementById('death');
    const chomp = document.getElementById('chomp');
    board.intro.pause();
    if(!board.muted){
      death.play();
      death.volume = .3;
      chomp.pause();
      window.setTimeout(() => {
        board.intro.play();
      }, 1500);
    }
    if(this.vulnerable){
      board.lives -= 1;
      this.vulnerable = false;
      board.dead = true;
    }
  }

  eatPill(board, dots, squareWidth, squareHeight, ghosts){
    const chomp = document.getElementById('chomp');
    chomp.volume = .3;
    const muted = board.muted;
    dots.forEach((dot) => {
      if(dot.eatable(this, squareWidth, squareHeight)){
        dot.hide();
        if(!muted){
          chomp.play();
        }
        if(dot instanceof LargePill){
          board.score += 50;
          ghosts.forEach((ghost) => ghost.makeEatable());
          if(!muted){
            chomp.play();
          }
        } else {
          board.score += 5;
        }
      }
    });
  }

}

export default QuackMan;
