import Board from './board';

class Game {
  constructor(board){
    this.board = board;
  }

  draw(){
    this.board.draw();
  }

  changeDirection(direction){
    this.board.changeDirection(direction);
  }
}

export default Game;
