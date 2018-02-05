import Util from './util';
import Wall from './wall';
import Pill from './pill';
import LargePill from './large_pill';
import QuackMan from './duck';
import Ghost from './ghost';
import DrawStrategy from './draw_strategy';
import _ from 'lodash';

class Board {

  constructor(ctx, grid, dots, quackMan, squareWidth, squareHeight, ghosts, defaultPositions, initQuack){
    this.ctx = ctx;
    this.grid = grid;
    this.dots = dots;
    this.quackMan = quackMan;
    this.ghosts = ghosts;
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.muted = true;
    this.defaultPositions = defaultPositions;
    this.initQuack = initQuack;
    this.dead = false;
    this.intro = document.getElementById('intro');
    this.getPoints = false;
    this.newLevel = false;
  }

  draw(){
    this.ctx.clearRect(0, 0, 600, 600);
    this.drawWalls();
    this.drawPills();
    this.quackMan.move(this, this.grid, this.squareWidth, this.squareHeight, this.dots, this.ghosts);
    this.moveGhosts();
  }

  setInterval(){
    this.ghosts.forEach((ghost) => {
      window.setInterval(() => {
        ghost.getRandomDirection();
      }, 1500);
    });
  }

  drawWalls(){
    this.grid.forEach((row) => {
      row.forEach((wall) => {
        if(wall instanceof Wall){
          wall.draw();
        }
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
    this.setInterval();

  }

  moveGhosts(){
    this.ghosts.forEach((ghost) => {
      ghost.move(this, this.grid, this.squareWidth, this.squareHeight, this.quackMan);
    });
    // const blinky = this.ghosts[0];
    // const grids = blinky.calculateMatrixPos(blinky.x, blinky.y, blinky.width, blinky.height);
    // const startX = grids.gridX;
    // const startY = grids.gridY - 1;
    // const quacks = this.quackMan.calculateMatrixPos(this.quackMan.x, this.quackMan.y, this.quackMan.width, this.quackMan.height);
    // const endX = quacks.gridX;
    // const endY = quacks.gridY - 1;

    // blinky.path = blinky.findShortestPath(startX, startY, endX, endY, this.grid);
    // blinky.move(this, this.grid, this.squareWidth, this.squareHeight, this.quackMan);

  }

  changeDirection(direction){
    this.quackMan.changeDirection(direction);
  }

  static fromString(ctx, boardModel){
    const rows = boardModel.split('\n');
    const grid = rows.map(row => row.split('') );
    const numRows = grid.length;
    const numCols = grid[0].length;
    const squareWidth = (ctx.canvas.width / numCols);
    const squareHeight = (ctx.canvas.height / numRows);
    const defaultPositions = [];
    let initQuack;

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
            initQuack = {x, y};
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

    return new Board(ctx, mappedGrid, dots, quackMan, squareWidth, squareHeight, ghosts, defaultPositions, initQuack);
  }

}

export default Board;
