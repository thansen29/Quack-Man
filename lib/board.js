import Util from './util';
import Wall from './wall';
import Pill from './pill';
import QuackMan from './duck';
import DrawStrategy from './draw_strategy';

const quackSpeed = 3;

class Board {

  constructor(ctx, grid, dots, quackMan, squareWidth, squareHeight){
    this.ctx = ctx;
    this.grid = grid;
    this.dots = dots;
    this.quackMan = quackMan;
    this.direction = [0, 0];
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
  }

  draw(){
    this.ctx.clearRect(0, 0, 600, 600);
    this.drawWalls();
    this.drawPills();
    this.moveQuackMan();
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

  moveQuackMan(){
    const startX = this.quackMan.x;
    const startY = this.quackMan.y;

    this.quackMan.x += this.direction[0] * quackSpeed;
    this.quackMan.y += this.direction[1] * quackSpeed;
    let finalPos = this.calculateMatrixPos(startX, startY);
    //here we have the new position on the canvas

    const offsetX = (this.squareWidth - this.quackMan.width) / 2; // 1.5 _
    const offsetY = (this.squareHeight - this.quackMan.height) / 2;

    //iterate through whole maze and see if quackmans pos intersects
    //with a wall
    let collides = false;
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        if(cell instanceof Wall){
          if(this.quackMan.collidesWith(cell)){
            collides = true;
          }
        }
      });
    });

    if(collides){
      // console.log("why", this.direction);
      this.quackMan.x = finalPos.x; + offsetX;
      this.quackMan.y = finalPos.y; + offsetY;
      this.direction = [0, 0];
    }

    this.wrapQuack(this.quackMan.x);
    this.quackMan.draw(this.direction);
  }

  changeDirection(direction){
    const currentLocation = this.calculateMatrixPos(this.quackMan.x, this.quackMan.y);
    const newX = currentLocation.gridX + direction[0];
    const newY = currentLocation.gridY + direction[1];
    if(this.grid.length >= newX &&
       this.grid[0].length >= newY){ //cant change directions into a wall
        const myCell = this.grid[newY][newX];
        if(!(myCell instanceof Wall)) {
          this.direction = direction;
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

  static fromString(ctx, boardModel){
    const rows = boardModel.split('\n');
    const grid = rows.map(row => row.split('') );
    const numRows = grid.length;
    const numCols = grid[0].length;
    const squareWidth = ctx.canvas.width / numCols;
    const squareHeight = ctx.canvas.height / numRows;

    const dots = [];
    let quackMan = null;
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

    return new Board(ctx, mappedGrid, dots, quackMan, squareWidth, squareHeight);
  }

}

export default Board;
