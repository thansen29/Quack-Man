class DrawStrategy {
  static drawTopWall(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.fillRect((width*.25 + x), y, width/2, height/2 );
    // ctx.lineWidth = 3;
    // ctx.moveTo((width*.25 + x) - 1.5, y);
    // ctx.lineTo((width*.25 + x) - 1.5, (height/2 + y));
    // ctx.stroke();
    //
    // ctx.moveTo((width*.75 + x) - 1.5, y);
    // ctx.lineTo((width*.75 + x) - 1.5, (height/2 + y));
    // ctx.stroke();
  }

  static drawBottomWall(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.fillRect((width*.25 + x), y+height/2, width/2, height/2 );
    // ctx.strokeStyle = "purple";
    // ctx.lineWidth = 3;
    // ctx.moveTo((width*.25 + x) - 1.5, (height/2 + y));
    // ctx.lineTo((width*.25 + x) - 1.5, (height+y));
    // ctx.stroke();
    //
    // ctx.moveTo((width*.75 + x) - 1.5, (height/2 + y));
    // ctx.lineTo((width*.75 + x) - 1.5, (height + y));
    // ctx.stroke();
  }

  static drawRightWall(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.fillRect((width/2 + x), y+height*.25, width/2, height/2 );
    // ctx.strokeStyle = "purple";
    // ctx.lineWidth = 3;
    // ctx.moveTo((x + width/2), ((height*.25 + y) - 1.5));
    // ctx.lineTo((x + width), (height*.25 + y) - 1.5);
    // ctx.stroke();
    //
    // ctx.moveTo((x + width/2), ((height*.75 + y) - 1.5));
    // ctx.lineTo((x + width), (height*.75 + y) - 1.5);
    // ctx.stroke();
  }

  static drawLeftWall(ctx, x, y, width, height){
    ctx.fillStyle = "purple";
    ctx.fillRect(x, y+height*.25, width/2, height/2 );
    // ctx.strokeStyle = "purple";
    // ctx.lineWidth = 3;
    // ctx.moveTo(x, ((height*.25 + y) - 1.5));
    // ctx.lineTo((x + width/2), (height*.25 + y) - 1.5);
    // ctx.stroke();
    //
    // ctx.moveTo(x, ((height*.75 + y) - 1.5));
    // ctx.lineTo((x + width/2), (height*.75 + y) - 1.5);
    // ctx.stroke();
  }

  static drawRightCap(ctx, x, y, width, height){
    // ctx.strokeStyle = "purple";
    // ctx.lineWidth = 3;
    // ctx.moveTo(x+width/2, (height*.25 + y) - 3);
    // ctx.lineTo(x+width/2, (height*.75 + y));
    // ctx.stroke();
    ctx.fillStyle = "purple";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x+width/2, y+height/2, height/4, Math.PI/2, Math.PI*1.5, true);
    ctx.fill();
  }

  static drawLeftCap(ctx, x, y, width, height){
    // ctx.strokeStyle = "purple";
    // ctx.lineWidth = 3;
    // ctx.moveTo(x+width/2, (height*.25 + y) - 3);
    // ctx.lineTo(x+width/2, (height*.75 + y));
    // ctx.stroke();
    ctx.fillStyle = "purple";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x+width/2, y+height/2, height/4, Math.PI/2, Math.PI*1.5, false);
    ctx.fill();
  }

  static drawTopCap(ctx, x, y, width, height){
    // ctx.strokeStyle = "purple";
    // ctx.lineWidth = 3;
    // ctx.moveTo(width*.25 + x-3, y+height/2);
    // ctx.lineTo(width+.75 + x-11, y+height/2);
    // ctx.stroke();
    ctx.fillStyle = "purple";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x+width/2, y+height/2, height/4, Math.PI, Math.PI*2, false);
    ctx.fill();
  }

  static drawBottomCap(ctx, x, y, width, height){
    // ctx.strokeStyle = "purple";
    // ctx.lineWidth = 3;
    // ctx.moveTo(width*.25 + x-3, y+height/2);
    // ctx.lineTo(width+.75 + x-11, y+height/2);
    // ctx.stroke();
    ctx.fillStyle = "purple";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x+width/2, y+height/2, height/4, Math.PI, Math.PI*2, true);
    ctx.fill();
  }
}

export default DrawStrategy;
