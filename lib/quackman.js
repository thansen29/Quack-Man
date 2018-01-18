import Board from './board.js';
import boardModel from './board_model.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 600;
  canvasEl.height = 600;


  const ctx = canvasEl.getContext("2d");
  // const duck = document.getElementsByClassName("duck");
  // const duck = new Image();
  // duck.src = "./assets/duck.png";
  // ctx.drawImage(duck, 310, 420, 40, 40);
  const board = Board.fromString(ctx, boardModel);
  board.draw();
});
