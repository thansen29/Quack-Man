import Ghost from './ghost';

class Pinky extends Ghost {
  
  draw(){
    if(!this.eatable){
      const ghostImg = new Image();
      ghostImg.src = `./assets/pinky.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
    }
  }
}

export default Pinky;
