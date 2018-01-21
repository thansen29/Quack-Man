import Ghost from './ghost';

class Inky extends Ghost {
  
  draw(){
    if(!this.eatable){
      const ghostImg = new Image();
      ghostImg.src = `./assets/inky.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
    }
  }
}

export default Inky;