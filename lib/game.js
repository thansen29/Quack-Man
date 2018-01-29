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

  moveQuackMan(dir){
    this.board.moveQuackMan(dir);
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

  // getRoundDetails(){
  //   return this.board.getRoundDetails();
  // }
  //
  // setRoundDetails(score, lives){
  //   this.board.setRoundDetails(score, lives);
  // }
}

export default Game;
