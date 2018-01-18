/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board_model_js__ = __webpack_require__(4);



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;



  const ctx = canvasEl.getContext("2d");
  const movingObject = __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */].fromString(__WEBPACK_IMPORTED_MODULE_1__board_model_js__["a" /* default */]);
  movingObject.draw(ctx);

  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
});


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Board {

  constructor(grid){
    this.grid = grid;
  }


  drawWalls(ctx){
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
      ctx.stroke();
    });
  }

  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.drawWalls(ctx);

    // let image = document.getElementsByClassName("duck");
    // debugger
    // let image = new Image(50, 50);
    // image.src = "assets/duck.png";
    // // debugger
    // const quackMan = ctx.drawImage(image, 50, 50);
  }

  static fromString(boardModel){
    const rows = boardModel.split('\n');
    const grid = rows.map(row => row.split('') );
    return new Board(grid);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const boardModel =
`XXXXXXXXXXXXXXX
X             X
X             X
X             X
X             X
X             X
XXXXXXXXXXXXXXX`;

/* harmony default export */ __webpack_exports__["a"] = (boardModel);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map