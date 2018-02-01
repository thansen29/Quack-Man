import Board from './board';

class Game {
  constructor(board, score, lives, level){
    this.board = board;
    this.score = score;
    this.lives = lives;
    this.level = level;
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

  getPoints(){
    return this.board.getPoints;
  }

  getScore(){
    return this.board.score;
  }

  getLevel(){
    return this.board.level;
  }

  getLives(){
    return this.board.lives;
  }

  setLevel(level){
    this.board.level = level;
  }

  setLives(lives){
    this.board.lives = lives;
  }

  setScore(score){
    this.board.score = score;
  }

}

export default Game;
