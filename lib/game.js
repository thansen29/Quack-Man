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
    this.board.restartGame();
  }
}

export default Game;
