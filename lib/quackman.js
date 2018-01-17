const MovingObject = require('./moving_object.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  const movingObject = new MovingObject();
  movingObject.draw(ctx);

  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
});
