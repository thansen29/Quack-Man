import Ghost from './ghost';

class Blinky extends Ghost {
  draw(){
    if(!this.eatable){
      const ghostImg = new Image();
      ghostImg.src = `./assets/blinky.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
    } else {
      const ghostImg = new Image();
      ghostImg.src = `./assets/eatable.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
    }
  }
}

export default Blinky;
