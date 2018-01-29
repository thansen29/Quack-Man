
import Util from './util';
import Wall from './wall';
import Pill from './pill';
import LargePill from './large_pill';
import QuackMan from './duck';
import Ghost from './ghost';
import DrawStrategy from './draw_strategy';
import _ from 'lodash';
// import boardModel from './board_model';

let randDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];

class Board {

  constructor(ctx, grid, dots, quackMan, squareWidth, squareHeight, ghosts, defaultPositions){
    this.ctx = ctx;
    this.grid = grid;
    this.dots = dots;
    this.quackMan = quackMan;
    this.ghosts = ghosts;
    // this.ghost.direction = [0, 0];
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
    this.score = 0;
    this.lives = 3;
    this.level = 0;
    this.muted = true;
    this.defaultPositions = defaultPositions;
    this.dead = false;

    this.intro = document.getElementById('intro');
  }

  draw(){
    this.ctx.clearRect(0, 0, 600, 600);
    this.drawWalls();
    this.drawPills();
    // this.drawGhosts();
    this.moveQuackMan();
    this.moveGhosts();
    // this.gameOver();
  }

  drawWalls(){
    this.grid.forEach((row) => {
      row.forEach((wall) => {
        if(wall) wall.draw();
      });
    });
  }

  drawPills(){
    this.dots.forEach((dot) => {
      dot.draw();
    });
  }

  drawGhosts(){
    this.ghosts.forEach((ghost) => {
      this.defaultPositions.push([[ghost.x, ghost.y]]);
      ghost.draw();
    });
    this.drawn = true;
  }

  //perhaps a timer to randomly call this every few seconds
  getRandomDirection(ghost){
    randDirections = _.shuffle(randDirections);
    const newDirection = randDirections[Math.floor(Math.random()*randDirections.length)];
    if(ghost.direction[0] === newDirection[0] &&
       ghost.direction[1] === newDirection[1]){
         return;
    }
    // if((ghost.direction[0] + newDirection[0] === 0) &&
    //    (ghost.direction[1] + newDirection[1] === 0)){
    //      console.log('inverse');
    //      this.getRandomDirection(ghost);
    //    } else {
         ghost.nextDirection = newDirection;
       // }

  }

  moveGhosts(){
    this.ghosts.forEach((ghost) => {
      this.changeGhostDirection(ghost);
      const startX = ghost.x;
      const startY = ghost.y;
      ghost.x += ghost.direction[0] * ghost.speed;
      ghost.y += ghost.direction[1] * ghost.speed;
      let finalPos = this.calculateMatrixPos(startX, startY);

      const offsetX = (this.squareWidth - ghost.width) / 2;
      const offsetY = (this.squareHeight - ghost.height) / 2;

      if(this.isCollision(ghost)){
        ghost.x = finalPos.x + offsetX;
        ghost.y = finalPos.y + offsetY;
        this.getRandomDirection(ghost);
      }
      if(ghost.direction[0] === 0 && ghost.direction[1] === 0 ){
        // ghost.direction = [1, 0];
        // ghost.nextDirection = [1, 0];
        // this.getRandomDirection(ghost);
      }

      this.wrap(ghost, ghost.x);
      this.ghostCollision(ghost);
      ghost.draw();
    });
  }


  changeGhostDirection(ghost){
    if(!ghost.nextDirection) return;

    const center = this.calculateCurrentCenter(ghost);
    const ghostX = center.x;
    const ghostY = center.y;

    const currentLocation = this.calculateMatrixPos(ghostX, ghostY);
    const currentGridX = currentLocation.gridX;
    const currentGridY = currentLocation.gridY;

    const nextCenter = this.calculateNextCenter(currentGridX, currentGridY);
    const nextCenterX = nextCenter.x;
    const nextCenterY = nextCenter.y;

    const nextX = currentGridX + ghost.nextDirection[0];
    const nextY = currentGridY + ghost.nextDirection[1];
    if(this.grid.length >= nextX &&
        this.grid[0].length >= nextY){
          const nextCell = this.grid[nextY][nextX];
          if(!(nextCell instanceof Wall)){

              if(this.notInverseDirection(ghost)) {
                if (this.smoothMovement(ghost, ghostX, ghostY, nextCenterX, nextCenterY)) {
                  return;
                }

              ghost.x = currentGridX * this.squareWidth + (this.squareWidth - ghost.width) / 2;
              ghost.y = currentGridY * this.squareHeight + (this.squareHeight - ghost.height) / 2;
            }
          ghost.direction = ghost.nextDirection;
        } else {
          this.getRandomDirection(ghost);
        }
    }
  }

  moveQuackMan(){
    this.actuallyChangeDirection();

    const startX = this.quackMan.x;
    const startY = this.quackMan.y;

    this.quackMan.x += this.quackMan.direction[0] * this.quackMan.speed;
    this.quackMan.y += this.quackMan.direction[1] * this.quackMan.speed;
    let finalPos = this.calculateMatrixPos(startX, startY);

    const offsetX = (this.squareWidth - this.quackMan.width) / 2; // 1.5 _
    const offsetY = (this.squareHeight - this.quackMan.height) / 2;

    if(this.isCollision()){
      this.quackMan.x = finalPos.x + offsetX;
      this.quackMan.y = finalPos.y + offsetY;
      this.quackMan.direction = [0, 0];
    }

    this.wrap(this.quackMan, this.quackMan.x);
    this.quackMan.draw(this.quackMan.direction);
    this.eatPill();
    this.showStats();
  }

  isCollision(ghost){
    let collides = false;
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        if(ghost){
          if(cell instanceof Wall && ghost.collidesWith(cell)){
            collides = true;
            return collides;
          }
        } else {
          if(cell instanceof Wall && this.quackMan.collidesWith(cell)){
            collides = true;
          }
        }
      });
    });
    return collides;
  }

  ghostCollision(ghost){
    if(ghost.collidesWith(this.quackMan) && ghost.eatable){
      this.eatGhost(ghost);
    } else if(ghost.collidesWith(this.quackMan) && !ghost.eatable){
      this.killQuackMan();
    }
  }

  eatPill(){
    const chomp = document.getElementById('chomp');
    this.dots.forEach((dot) => {
      if(this.canEatPill(dot)){
        dot.hide();
        if(!this.muted){
          chomp.volume = .3;
          chomp.play();
        }
        if(dot instanceof LargePill){
          this.score += 50;
          this.makeEatable();
          if(!this.muted){
            chomp.volume = .3;
            chomp.play();
          }
        } else {
          this.score += 5;
        }
      }
    });
  }

  canEatPill(dot){
    const quackLocation = this.calculateMatrixPos(this.quackMan.x, this.quackMan.y);
    const dotLocation = this.calculateMatrixPos(dot.x, dot.y);
    return dotLocation.gridX === quackLocation.gridX &&
    dotLocation.gridY === quackLocation.gridY &&
    dot.visible;
  }

  changeDirection(direction){
    if(direction[0] === this.quackMan.direction[0] &&
      direction[1] === this.quackMan.direction[1])
      return;

    this.quackMan.nextDirection = direction;
  }

  calculateCurrentCenter(object){
    return {
      x: object.x + object.width / 2,
      y: object.y + object.height / 2
    };
  }

  calculateNextCenter(gridX, gridY){
    return {
      x: gridX * this.squareWidth + (this.squareWidth / 2),
      y: gridY * this.squareHeight + (this.squareHeight / 2)
    };
  }

  actuallyChangeDirection(){
    if(!this.quackMan.nextDirection) return;

    const center = this.calculateCurrentCenter(this.quackMan);
    const quackCenterX = center.x;
    const quackCenterY = center.y;

    const currentLocation = this.calculateMatrixPos(quackCenterX, quackCenterY);
    const currentGridX = currentLocation.gridX;
    const currentGridY = currentLocation.gridY;

    const nextCenter = this.calculateNextCenter(currentGridX, currentGridY);
    const nextCenterX = nextCenter.x;
    const nextCenterY = nextCenter.y;

    const nextGridX = currentGridX + this.quackMan.nextDirection[0];
    const nextGridY = currentGridY + this.quackMan.nextDirection[1];
    if(this.grid.length >= nextGridX &&
       this.grid[0].length >= nextGridY){
        const nextCell = this.grid[nextGridY][nextGridX];
        if(!(nextCell instanceof Wall)) {

          if(this.notInverseDirection(this.quackMan, quackCenterX, nextCenterX)) {
            if (this.smoothMovement(this.quackMan, quackCenterX, quackCenterY, nextCenterX, nextCenterY)) {
              return;
            }

            this.quackMan.x = currentGridX * this.squareWidth + (this.squareWidth - this.quackMan.width) / 2;
            this.quackMan.y = currentGridY * this.squareHeight + (this.squareHeight - this.quackMan.height) / 2;
          }
          this.quackMan.direction = this.quackMan.nextDirection;
          this.quackMan.nextDirection = null;
        }
    }
  }

  smoothMovement(object, centerX, centerY, nextCenterX, nextCenterY){
    return (object.direction[0] === -1 && centerX >= nextCenterX) ||
        (object.direction[0] === 1 && centerX <= nextCenterX) ||
        (object.direction[1] === -1 && centerY >= nextCenterY) ||
        (object.direction[1] === 1 && centerY <= nextCenterY);
  }

  notInverseDirection(object){
    return object.direction[0] + object.nextDirection[0] &&
    object.direction[1] + object.nextDirection[1];
  }

  calculateMatrixPos(x, y){
    let gridX = Math.floor(x / this.squareWidth);
    let gridY = Math.floor(y / this.squareHeight);
    return {
      x: gridX * this.squareWidth,
      y: gridY * this.squareHeight,
      gridX,
      gridY
    };
  }

  wrap(object, x){
    if(x >= 600){
      object.x = 0;
    } else if(x <= 0){
      object.x = 600;
    }
  }

  makeEatable(){
    this.ghosts.forEach((ghost) => {
      ghost.vulnerable = true;
      ghost.eatable = true;
      window.setTimeout(() => {
        ghost.eatable = false;
      }, 4000);
    });
  }

  //need to make quackman vulnerable again at level reset, this.dead
  killQuackMan(){
    const death = document.getElementById('death');
    const chomp = document.getElementById('chomp');
    this.intro.pause();
    if(!this.muted){
      death.play();
      death.volume = .3;
      chomp.pause();
      window.setTimeout(() => {
        this.intro.play();
      }, 1500);
    }
    if(this.quackMan.vulnerable){
      this.lives -= 1;
      this.quackMan.vulnerable = false;
      this.dead = true;
      this.restartGame();
      console.log("you ded");
    }
  }

  eatGhost(ghost){
    const intro = document.getElementById('intro');
    const eatGhost = document.getElementById('eatghost');
    intro.pause();
    if(!this.muted){
      intro.volume = .3;
      eatGhost.volume = .3;

      eatGhost.play();
      intro.play();
    }
    if(ghost.vulnerable){
      this.score += 200;
      ghost.eaten = true;
      window.setTimeout(() => {
        ghost.eaten = false;
      }, 2000);
      console.log("you ate him");
      ghost.vulnerable = false;

    }
  }


  showStats(){
    const score = $('.score');
    const lives = $('.lives');
    const level = $('.level');
    score.html("Score:" + this.score);
    lives.html("Lives:" + this.lives );
    level.html("Level:" + this.level );
  }

  toggleSound(muted){
    this.muted = muted;
  }

  //TODO: need to figure out how to go back to default board
  restartGame(){
    return this.dead;
  }


  gameOver(){
    if(this.lives <= 0){
      return true;
    } else {
      return false;
    }
  }

  setDefaultPositions(){
    this.dead = false;
    this.quackMan.vulnerable = true;
    this.quackMan.direction = [0, 0];
    this.quackMan.nextDirection = [0, 0];
    this.quackMan.x = 284.2105263157895;
    this.quackMan.y = 428.5714285714286;
    let i = 0;
    this.ghosts.forEach((ghost) => {
      ghost.x = this.defaultPositions[i].x;
      ghost.y = this.defaultPositions[i].y;
      i+=1;
      ghost.direction = [0, 0];
      ghost.nextDirection = [0, -1];
    });

  }

  // getRoundDetails(){
  //   return {
  //     score: this.score,
  //     lives: this.lives
  //   };
  // }
  //
  // setRoundDetails(score, lives){
  //   this.score = score;
  //   this.lives = lives;
  // }

  static fromString(ctx, boardModel){
    const rows = boardModel.split('\n');
    const grid = rows.map(row => row.split('') );
    const numRows = grid.length;
    const numCols = grid[0].length;
    const squareWidth = (ctx.canvas.width / numCols);
    const squareHeight = (ctx.canvas.height / numRows);
    const defaultPositions = [];

    const dots = [];
    let quackMan = null;
    const ghosts = [];
    const mappedGrid = grid.map((row, rowIdx) => {
      return row.map((cell, cellIdx) => {
        const x = cellIdx * squareWidth;
        const y = rowIdx * squareHeight;

        const item = Util.mazeFactory(ctx, cell, x, y, squareWidth, squareHeight);
        switch (cell) {
          case ".":
          case "o":
            dots.push(item);
            break;
          case "q":
            quackMan = item;
            break;
          case "b":
          case "i":
          case "p":
          case "c":
            ghosts.push(item);
            defaultPositions.push({x, y});
            break;
          default:
            return item;
        }
        return null;
      });
    });

    mappedGrid.forEach((row, rowIdx) => {
      row.forEach((cell, cellIdx) => {
        if(cell instanceof Wall){
          let nextHorz = mappedGrid[rowIdx][cellIdx + 1] || null;
          let prevHorz = mappedGrid[rowIdx][cellIdx - 1] || null;
          let nextVert = mappedGrid[rowIdx+1] ? mappedGrid[rowIdx+1][cellIdx] : null;
          let prevVert = mappedGrid[rowIdx-1] ? mappedGrid[rowIdx-1][cellIdx] : null;

          if(nextHorz instanceof Wall){
            cell.addDrawStrategy(DrawStrategy.drawRightWall);
          } else if(prevHorz instanceof Wall){
            cell.addDrawStrategy(DrawStrategy.drawRightCap);
          }
          if(prevHorz instanceof Wall){
            cell.addDrawStrategy(DrawStrategy.drawLeftWall);
          } else if(nextHorz instanceof Wall){
            cell.addDrawStrategy(DrawStrategy.drawLeftCap);
          }
          if(nextVert instanceof Wall){
            cell.addDrawStrategy(DrawStrategy.drawBottomWall);
          } else if(prevVert instanceof Wall){
            cell.addDrawStrategy(DrawStrategy.drawBottomCap);
          }
          if(prevVert instanceof Wall){
            cell.addDrawStrategy(DrawStrategy.drawTopWall);
          } else if(nextVert instanceof Wall){
            cell.addDrawStrategy(DrawStrategy.drawTopCap);
          }
        }
      });
    });

    return new Board(ctx, mappedGrid, dots, quackMan, squareWidth, squareHeight, ghosts, defaultPositions);
  }

}

export default Board;
