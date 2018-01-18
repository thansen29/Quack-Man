import Board from './board.js';
import boardModel from './board_model.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 600;
  canvasEl.height = 520;



  const ctx = canvasEl.getContext("2d");
  const movingObject = Board.fromString(ctx, boardModel);
  movingObject.draw();
  // movingObject.draw(ctx);

  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
});
