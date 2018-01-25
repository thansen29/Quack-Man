import Util from './util';
import Wall from './wall';
import Pill from './pill';
import LargePill from './large_pill';
import QuackMan from './duck';
import Ghost from './ghost';
import DrawStrategy from './draw_strategy';
// import boardModel from './board_model';

const quackSpeed = 3;
const randDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];

class Board {

  constructor(ctx, grid, dots, quackMan, squareWidth, squareHeight, ghosts){
    this.ctx = ctx;
    this.grid = grid;
    this.dots = dots;
    this.quackMan = quackMan;
    this.ghosts = ghosts;
    this.direction = [0, 0];
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
    this.score = 0;
    this.lives = 3;
    this.level = 0;
    this.muted = true;

    this.intro = document.getElementById('intro');
  }

  draw(){
    this.ctx.clearRect(0, 0, 600, 600);
    this.drawWalls();
    this.drawPills();
    this.drawGhosts();
    this.moveQuackMan();
    // this.moveGhosts();
    this.gameOver();
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
      ghost.draw();
    });
    this.drawn = true;
  }

  moveGhosts(){
    let randDir = randDirections[Math.floor(Math.random()*randDirections.length)];

    this.ghosts.forEach((ghost) => {
      const startX = ghost.x;
      const startY = ghost.y;
      let currPos = this.calculateMatrixPos(startX, startY);

      let newGridX = currPos.gridX + randDir[0];
      let newGridY = currPos.gridY + randDir[1];

      let finalX = newGridX * this.squareWidth;
      let finalY = newGridY * this.squareHeight;
      // finalX -= this.squareWidth * quackSpeed;
      // finalY -= this.squareHeight * quackSpeed;

      const offsetX = (this.squareWidth - ghost.width) / 2; // 1.5 _
      const offsetY = (this.squareHeight - ghost.height) / 2;
      // debugger
      if(this.ghostCollision(ghost)){
        ghost.x = startX + offsetX;
        ghost.y = startY + offsetY;
        randDir = [0, 0];
      } else {
        ghost.x = finalX + offsetX;
        ghost.y = finalY + offsetY;
      }

      ghost.draw();
    });
  }

  moveQuackMan(dir){
    this.actuallyChangeDirection();
    if(dir){
      this.direction = dir;
    }
    const startX = this.quackMan.x;
    const startY = this.quackMan.y;

    this.quackMan.x += this.direction[0] * quackSpeed;
    this.quackMan.y += this.direction[1] * quackSpeed;
    let finalPos = this.calculateMatrixPos(startX, startY);

    const offsetX = (this.squareWidth - this.quackMan.width) / 2; // 1.5 _
    const offsetY = (this.squareHeight - this.quackMan.height) / 2;

    if(this.isCollision()){
      this.quackMan.x = finalPos.x + offsetX;
      this.quackMan.y = finalPos.y + offsetY;
      this.direction = [0, 0];
    }

    this.wrapQuack(this.quackMan.x);
    this.quackMan.draw(this.direction);
    this.eatPill();
    this.showStats();
  }

  isCollision(){
    let collides = false;
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        if(cell instanceof Wall && this.quackMan.collidesWith(cell)){
          collides = true;
        } else if(cell instanceof Ghost && this.quackMan.collidesWith(cell)){
            collides = true;
            if(cell.eatable){
              this.eatGhost();
            } else {
              this.killQuackMan();
            }
          }
      });
    });
    return collides;
  }

  ghostCollision(ghost){
    let collides = false;
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        if(cell instanceof Wall && ghost.collidesWith(cell)){
          collides = true;
        } else if(ghost.x === this.quackMan.x && ghost.y === this.quackMan.y){
          collides = true;
          if(ghost.eatable){
            this.eatGhost();
          } else {
            this.killQuackMan();
          }
        }
      });
    });
    return collides;
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
    if(direction[0] === this.direction[0] &&
      direction[1] === this.direction[1])
      return;

    this.nextDirection = direction;
  }

  actuallyChangeDirection(){
    if(!this.nextDirection){
      return;
    }
    const quackX = this.quackMan.x + this.quackMan.width / 2;
    const quackY = this.quackMan.y + this.quackMan.height / 2;
    const currentLocation = this.calculateMatrixPos(quackX, quackY);
    const curDirXPos = currentLocation.gridX + this.direction[0];
    const curDirYPos = currentLocation.gridY + this.direction[1];
    const newX = currentLocation.gridX + this.nextDirection[0];
    const newY = currentLocation.gridY + this.nextDirection[1];

    const nextX = newX * this.squareWidth + (this.squareWidth / 2);
    const nextY = newY * this.squareHeight + (this.squareHeight / 2);

    const curDirX = curDirXPos * this.squareWidth + (this.squareWidth / 2);
    const curDirY = curDirYPos * this.squareHeight + (this.squareHeight / 2);

    const curX = currentLocation.gridX;
    const curY = currentLocation.gridY;

    if(this.grid.length >= newX &&
       this.grid[0].length >= newY){
        const myCell = this.grid[newY][newX];
        if(!(myCell instanceof Wall)) {


          if((this.direction[0] + this.nextDirection[0]) && (this.direction[1] + this.nextDirection[1])) {
            // if ((this.nextDirection[0] === -1 && quackX >= curDirX) ||
            //     (this.nextDirection[0] === 1 && quackX <= curDirX) ||
            //     (this.nextDirection[1] === -1 && quackY >= curDirY) ||
            //     (this.nextDirection[1] === 1 && quackY <= curDirY)) {
            //   return
            // }

            this.quackMan.x = curX * this.squareWidth + (this.squareWidth - this.quackMan.width) / 2;
            this.quackMan.y = curY * this.squareHeight + (this.squareHeight - this.quackMan.height) / 2;
          }
          this.direction = this.nextDirection;
          this.nextDirection = null;
        }
    }
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

  wrapQuack(x){
    if(x >= 600){
      this.quackMan.x = 0;
    } else if(x <= 0){
      this.quackMan.x = 600;
    }
  }

  makeEatable(){
    this.ghosts.forEach((ghost) => {
      ghost.eatable = true;
      window.setTimeout(() => {
        ghost.eatable = false;
      }, 5000);
    });
  }

  killQuackMan(){
    this.lives -= 1;
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
    console.log("you ded");
  }

  eatGhost(){
    const intro = document.getElementById('intro');
    const eatGhost = document.getElementById('eatghost');
    intro.pause();
    if(!this.muted){
      intro.volume = .3;
      eatGhost.volume = .3;

      eatGhost.play();
      intro.play();
    }
    this.score += 200;
    console.log("you ate him");
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
    this.score = 0;
    this.lives = 3;
    this.level = 0;
    this.muted = true;

  }

  gameOver(){
    if(this.lives === 0){
      console.log('you lose');
      this.restartGame();
    }
  }

  static fromString(ctx, boardModel){
    const rows = boardModel.split('\n');
    const grid = rows.map(row => row.split('') );
    const numRows = grid.length;
    const numCols = grid[0].length;
    const squareWidth = (ctx.canvas.width / numCols);
    const squareHeight = (ctx.canvas.height / numRows);

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
            // return item;//currently each ghost is in the grid
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

    return new Board(ctx, mappedGrid, dots, quackMan, squareWidth, squareHeight, ghosts);
  }

}

export default Board;
