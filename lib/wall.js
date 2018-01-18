import VisibleObject from './visible_object';

class Wall extends VisibleObject {
  constructor(ctx, x, y, width, height) {
    super(ctx, x, y, width, height);
    this.drawStrategy = [];
  }

  draw(){
    if(this.drawStrategy.length){
      this.drawStrategy.forEach((drawStrategy) => {
        drawStrategy(this.ctx, this.x, this.y, this.width, this.height);
      });
    }
    // this.ctx.strokeStyle = "green";
    // this.ctx.rect(this.x, this.y, this.width, this.height);
    // this.ctx.stroke();
  }

  addDrawStrategy(drawStrategy){
    this.drawStrategy.push(drawStrategy);
  }
}

export default Wall;
