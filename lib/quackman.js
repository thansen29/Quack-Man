import Board from './board.js';
import boardModel from './board_model.js';
import GameView from './game_view';
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 600;
  canvasEl.height = 600;

  const ctx = canvasEl.getContext("2d");

  const board = Board.fromString(ctx, boardModel);
  const game = new Game(board);
  const gameView = new GameView(ctx, game);
  gameView.start();
  // gameView.bindKeyHandlers();

});
