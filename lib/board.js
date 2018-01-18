import Util from './util';

class Board {

  constructor(ctx, grid){
    this.ctx = ctx;
    this.grid = grid;
  }

  drawWalls(ctx){
    const walls = [
      [10, 10, 10, 205],
      [15, 10, 15, 200],
      [15, 200, 105, 200],
      [10, 205, 100, 205],
      [105, 200, 105, 255],
      [100, 205, 100, 250],
      [105, 255, 0, 255],
      [100, 250, 0, 250],

      [0, 285, 105, 285],
      [0, 290, 100, 290],
      [100, 290, 100, 345],
      [105, 285, 105, 350],
      [100, 345, 10, 345],
      [105, 350, 15, 350],
      [10, 345, 10, 490],
      [15, 350, 15, 485],

      [10, 490, 490, 490],
      [15, 485, 485, 485]
    ];

    walls.forEach((wall) => {
      ctx.strokeStyle = "purple";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(wall[0], wall[1]);
      ctx.lineTo(wall[2], wall[3]);
      ctx.stroke();
    });
  }

  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.drawWalls(ctx);

    // let image = document.getElementsByClassName("duck");
    // debugger
    // let image = new Image(50, 50);
    // image.src = "assets/duck.png";
    // // debugger
    // const quackMan = ctx.drawImage(image, 50, 50);
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
        return Util.mazeFactory(cell, x, y, width, height);
      });
    });
    return new Board(ctx, mappedGrid);
  }

}

export default Board;
