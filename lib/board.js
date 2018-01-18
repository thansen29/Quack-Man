import Util from './util';
import Wall from './wall';
import Pill from './pill';
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

    const numRows = grid.length;
    const numCols = grid[0].length;
    const width = ctx.canvas.width / numCols;
    const height = ctx.canvas.height / numRows;

    const mappedGrid = grid.map((row, rowIdx) => {
      return row.map((cell, cellIdx) => {
        const x = cellIdx * width;
        const y = rowIdx * height;
        return Util.mazeFactory(ctx, cell, x, y, width, height);
      });
    });
// debugger
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
        } else {
          console.log("draw pill");
        }
      });
    });

    return new Board(ctx, mappedGrid);
  }

}

export default Board;
