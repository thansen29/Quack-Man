class MovingObject {
  constructor(){

  }

  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = "purple";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 205);
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, 10);
    ctx.lineTo(15, 200);
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, 200);
    ctx.lineTo(100, 200);
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10, 205);
    ctx.lineTo(100, 205);
    ctx.lineCap = "round";
    ctx.stroke();


    // ctx.beginPath();
    // ctx.moveTo(10, 200);
    // ctx.arcTo(10, 200, 15, 220, 30);
    // ctx.lineTo(25, 215);
    // ctx.stroke();
    //
    //
    // ctx.beginPath();
    // ctx.moveTo(15, 200);
    // ctx.arcTo(15, 200, 15, 220, 10);
    // ctx.lineTo(20, 205);
    // ctx.stroke();

    //just draws a circle
    // ctx.fillStyle = "yellow";
    // ctx.beginPath();
    // ctx.arc(100, 75, 50, 0, 2*Math.PI);
    // ctx.fill();

    // let image = document.getElementsByClassName("duck");
    // debugger
    // let image = new Image(50, 50);
    // image.src = "assets/duck.png";
    // // debugger
    // const quackMan = ctx.drawImage(image, 50, 50);
  }
}

module.exports = MovingObject;
