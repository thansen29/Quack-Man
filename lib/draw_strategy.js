class DrawStrategy {
  static drawTopWall(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.fillRect((width*.25 + x), y, width/2, height/2 );
  }

  static drawBottomWall(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.fillRect((width*.25 + x), y+height/2, width/2, height/2 );
  }

  static drawRightWall(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.fillRect((width/2 + x), y+height*.25, width/2, height/2 );
  }

  static drawLeftWall(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.fillRect(x, y+height*.25, width/2, height/2 );
  }

  static drawRightCap(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x+width/2, y+height/2, height/4, Math.PI/2, Math.PI*1.5, true);
    ctx.fill();
  }

  static drawLeftCap(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x+width/2, y+height/2, height/4, Math.PI/2, Math.PI*1.5, false);
    ctx.fill();
  }

  static drawTopCap(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x+width/2, y+height/2, height/3.5, Math.PI, Math.PI*2, false);
    ctx.fill();
  }

  static drawBottomCap(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x+width/2, y+height/2, height/3.5, Math.PI, Math.PI*2, true);
    ctx.fill();
  }
}

export default DrawStrategy;