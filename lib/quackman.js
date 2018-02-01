import Board from './board.js';
import boardModel from './board_model.js';
import GameView from './game_view';
import Game from './game';
import FontFaceObserver from 'fontfaceobserver';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 600;
  canvasEl.height = 600;

  const ctx = canvasEl.getContext("2d");
  const font = new FontFaceObserver('PressStart');
  const model = boardModel[0];
  const board = Board.fromString(ctx, model);
  const game = new Game(board);
  const gameView = new GameView(ctx, game);
  font.load().then( () => {
    gameView.start();
  }, () => {
    console.log('the font failed to load');
  });

});
