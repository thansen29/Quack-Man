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
    this.moveQuackMan();
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
    this.setInterval();

  }

  moveGhosts(){
    this.ghosts.forEach((ghost) => {
      ghost.changeGhostDirection(this.grid, this.squareWidth, this.squareHeight);
      const startX = ghost.x;
      const startY = ghost.y;
      ghost.x += ghost.direction[0] * ghost.speed;
      ghost.y += ghost.direction[1] * ghost.speed;
      let finalPos = ghost.calculateMatrixPos(startX, startY, this.squareWidth, this.squareHeight);

      const offsetX = (this.squareWidth - ghost.width) / 2;
      const offsetY = (this.squareHeight - ghost.height) / 2;

      if(ghost.wallCollision(this.grid)){
        ghost.x = finalPos.x + offsetX;
        ghost.y = finalPos.y + offsetY;
        ghost.getRandomDirection();
      }

      ghost.wrap(ghost.x, ghost.y);
      this.ghostCollision(ghost);
      ghost.draw();
    });
  }

  moveQuackMan(){
    this.quackMan.actuallyChangeDirection(this.grid, this.squareWidth, this.squareHeight);

    const startX = this.quackMan.x;
    const startY = this.quackMan.y;

    this.quackMan.x += this.quackMan.direction[0] * this.quackMan.speed;
    this.quackMan.y += this.quackMan.direction[1] * this.quackMan.speed;
    let finalPos = this.quackMan.calculateMatrixPos(startX, startY, this.squareWidth, this.squareHeight);

    const offsetX = (this.squareWidth - this.quackMan.width) / 2;
    const offsetY = (this.squareHeight - this.quackMan.height) / 2;

    if(this.quackMan.wallCollision(this.grid)){
      this.quackMan.x = finalPos.x + offsetX;
      this.quackMan.y = finalPos.y + offsetY;
      this.quackMan.direction = [0, 0];
    }

    this.quackMan.wrap(this.quackMan.x, this.quackMan.y);
    this.quackMan.draw(this.quackMan.direction);
    this.eatPill();
    this.showStats();
  }

  ghostCollision(ghost){
    if(ghost.collidesWith(this.quackMan) && ghost.vulnerable){
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
    const quackLocation = this.quackMan.calculateMatrixPos(this.quackMan.x, this.quackMan.y, this.squareWidth, this.squareHeight);
    const dotLocation = dot.calculateMatrixPos(dot.x, dot.y, this.squareWidth, this.squareHeight);
    return dotLocation.gridX === quackLocation.gridX &&
    dotLocation.gridY === quackLocation.gridY &&
    dot.visible;
  }

  changeDirection(direction){
    this.quackMan.changeDirection(direction);
  }

  makeEatable(){
    this.ghosts.forEach((ghost) => {
      ghost.vulnerable = true;
      ghost.eatable = true;
      ghost.flicker();
    });
  }

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
      this.getPoints = true;
      window.setTimeout(() => {
        this.getPoints = false;
      }, 200);
      this.score += 200;
      ghost.eaten = true;
      this.ctx.font = '12px PressStart';
      this.ctx.fillText("200", this.quackMan.x, this.quackMan.y - 5);
      window.setTimeout(() => {
        ghost.eaten = false;
      }, 2000);
      ghost.vulnerable = false;
    }
  }

  getPoints(){
    return this.getPoints;
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

  roundOver(){
    const complete = this.dots.every((dot) => !dot.visible);
    if(complete){
      this.level += 1;
      this.dots.forEach((dot) =>{
        dot.visible = true;
      });
    }
    return complete;
  }

  //TODO: animate death?
  setDefaultPositions(){
    this.dead = false;
    this.quackMan.vulnerable = true;
    this.quackMan.direction = [0, 0];
    this.quackMan.nextDirection = [0, 0];
    this.quackMan.x = this.initQuack.x;
    this.quackMan.y = this.initQuack.y;
    let i = 0;
    this.ghosts.forEach((ghost) => {
      ghost.x = this.defaultPositions[i].x;
      ghost.y = this.defaultPositions[i].y;
      i+=1;
      ghost.direction = [0, 0];
      ghost.nextDirection = [0, -1];
    });

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
