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
    this.board.muted = muted;
  }

  gameOver(){
    return this.board.lives <= 0 ? true : false;
  }

  restartGame(){
    return this.board.dead;
  }

  roundOver(){
    const complete = this.board.dots.every((dot) => !dot.visible);
    if(complete){
      this.board.level += 1;
      this.board.dots.forEach((dot) => {
        dot.visible = true;
      });
    }
    return complete;
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

  updateStats(){
    this.lives = this.board.lives;
    this.score = this.board.score;
    this.level = this.board.level;
  }

  showStats(){
    const score = $('.score');
    const lives = $('.lives');
    const level = $('.level');
    score.html("Score:" + this.board.score);
    lives.html("Lives:" + this.board.lives );
    level.html("Level:" + this.board.level );
  }

  //TODO: animate death?
  setDefaultPositions(){
    this.board.dead = false;
    this.board.quackMan.vulnerable = true;
    this.board.quackMan.direction = [0, 0];
    this.board.quackMan.nextDirection = [0, 0];
    this.board.quackMan.x = this.board.initQuack.x;
    this.board.quackMan.y = this.board.initQuack.y;
    let i = 0;
    this.board.ghosts.forEach((ghost) => {
      ghost.x = this.board.defaultPositions[i].x;
      ghost.y = this.board.defaultPositions[i].y;
      i+=1;
      ghost.direction = [0, 0];
      ghost.nextDirection = [0, -1];
    });
  }

}

export default Game;
