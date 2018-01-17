


class MovingObject {

  constructor(){

  }

  drawWall(ctx){
    const walls = [
      [10, 10, 10, 205],
      [15, 10, 15, 200],
      [15, 200, 105, 200],
      [10, 205, 100, 205],
      [105, 200, 105, 255],
      [100, 205, 100, 250],
      [105, 255, 0, 255],
      [100, 250, 0, 250],

      [0, 285, 105, 285],
      [0, 290, 100, 290],
      [100, 290, 100, 345],
      [105, 285, 105, 350],
      [100, 345, 10, 345],
      [105, 350, 15, 350],
      [10, 345, 10, 490],
      [15, 350, 15, 485],

      [10, 490, 490, 490],
      [15, 485, 485, 485]
    ];

    walls.forEach((wall) => {
      ctx.strokeStyle = "purple";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(wall[0], wall[1]);
      ctx.lineTo(wall[2], wall[3]);
      ctx.lineCap = "round";
      ctx.stroke();
    });
  }

  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.drawWall(ctx);
    // ctx.strokeStyle = "purple";
    // ctx.lineWidth = 2;

    // ctx.beginPath();
    // ctx.moveTo(10, 10);
    // ctx.lineTo(10, 205);
    // ctx.lineCap = "round";
    // ctx.stroke();
    //
    // ctx.beginPath();
    // ctx.moveTo(15, 10);
    // ctx.lineTo(15, 200);
    // ctx.lineCap = "round";
    // ctx.stroke();
    //
    // ctx.beginPath();
    // ctx.moveTo(15, 200);
    // ctx.lineTo(100, 200);
    // ctx.lineCap = "round";
    // ctx.stroke();
    //
    // ctx.beginPath();
    // ctx.moveTo(10, 205);
    // ctx.lineTo(100, 205);
    // ctx.lineCap = "round";
    // ctx.stroke();


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
