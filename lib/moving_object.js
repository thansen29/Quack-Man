class MovingObject {
  constructor(){

  }

  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}

module.exports = MovingObject;
