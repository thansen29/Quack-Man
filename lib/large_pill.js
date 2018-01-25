import VisibleObject from './visible_object';

class LargePill extends VisibleObject{
  constructor(ctx, x, y, width, height) {
    super(ctx, x, y, width, height);
    this.visible = true;
  }

  draw(){
    if(this.visible){
      this.ctx.beginPath();
      this.ctx.fillStyle = "yellow";
      this.ctx.lineWidth = 0;
      this.ctx.arc(this.x+this.width/2, this.y+this.height/2, this.height/4, 2*Math.PI, false);
      this.ctx.fill();
    }
  }

  hide(){
    this.visible = false;
  }
}

export default LargePill;
