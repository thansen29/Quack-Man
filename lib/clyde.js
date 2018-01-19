import Ghost from './ghost';

class Clyde extends Ghost {
  
  draw(){
    if(!this.eatable){
      const ghostImg = new Image();
      ghostImg.src = `./assets/clyde.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
    }
  }
}

export default Clyde;
