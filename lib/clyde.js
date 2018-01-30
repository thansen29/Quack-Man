import Ghost from './ghost';

class Clyde extends Ghost {

  draw(){
    if(!this.eatable){
      const ghostImg = new Image();
      ghostImg.src = `./assets/clyde.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
      this.speed = 1.25;
    } else {
      if(this.eaten){
        this.speed = 3;
        const ghostImg = new Image();
        ghostImg.src = `./assets/eyes.png`;
        this.ctx.drawImage(ghostImg, this.x, this.y, this.width/2, this.height/2);
        return;
      }
      const ghostImg = new Image();
      this.speed = .8;
      ghostImg.src = `./assets/eatable.png`;
      this.ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
    }
  }
}

export default Clyde;
