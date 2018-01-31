import Board from './board';

class Game {
  constructor(board){
    this.board = board;
  }

  draw(){
    this.board.draw();
  }

  drawGhosts(){
    this.board.drawGhosts();
  }

  moveGhosts(){
    this.board.moveGhosts();
  }

  changeDirection(direction){
    this.board.changeDirection(direction);
  }

  toggleSound(muted){
    this.board.toggleSound(muted);
  }

  gameOver(){
    return this.board.gameOver();
  }

  restartGame(){
    return this.board.restartGame();
  }

  setDefaultPositions(){
    this.board.setDefaultPositions();
  }

  roundOver(){
    return this.board.roundOver();
  }

  getScore(){
    return this.board.score;
  }

  getPoints(){
    return this.board.getPoints;
  }
}

export default Game;
