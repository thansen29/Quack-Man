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
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {




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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map