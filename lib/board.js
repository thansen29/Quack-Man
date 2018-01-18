import Util from './util';
import Wall from './wall';
import Pill from './pill';
import QuackMan from './duck';
import DrawStrategy from './draw_strategy';

class Board {

  constructor(ctx, grid){
    this.ctx = ctx;
    this.grid = grid;
  }

  draw(){
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        if(cell) cell.draw();
      });
    });
  }

  static fromString(ctx, boardModel){
    const rows = boardModel.split('\n');
    const grid = rows.map(row => row.split('') );
    const startPoint = { x: 347.36842105263156, y: 428.5714285714286 };
    const numRows = grid.length;
    const numCols = grid[0].length;
    const width = ctx.canvas.width / numCols;
    const height = ctx.canvas.height / numRows;

    const mappedGrid = grid.map((row, rowIdx) => {
      return row.map((cell, cellIdx) => {
        const x = cellIdx * width;
        const y = rowIdx * height;
        if(startPoint.x === x && startPoint.y === y){
          return new QuackMan(ctx, x, y, width, height);
          // const duck = new Image();
          // duck.src = "./assets/duck.png";
          // ctx.drawImage(duck, 345, 420, 40, 40);
        } else {
          return Util.mazeFactory(ctx, cell, x, y, width, height);
        }

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

    return new Board(ctx, mappedGrid);
  }

}

export default Board;
