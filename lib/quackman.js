import Board from './board.js';
import boardModel from './board_model.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;



  const ctx = canvasEl.getContext("2d");
  const movingObject = Board.fromString(boardModel);
  movingObject.draw(ctx);

  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
});
