import Board from './board';

class Game {
  constructor(board){
    this.board = board;
  }

  draw(){
    this.board.draw();
  }

  moveGhosts(){
    this.board.moveGhosts();
  }


  changeDirection(direction){
    this.board.changeDirection(direction);
  }
}

export default Game;
