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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Furry = __webpack_require__(2);
var Coin = __webpack_require__(1);

var scoreMain = document.querySelector('#score strong');
var Over = document.querySelector('#over');

function Game() {
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var self = this;
    this.board = document.querySelectorAll('#board div');
    this.index = function (x, y) {
        return x + y * 10;
    };

    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };

    this.stopGame = function () {
        clearInterval(this.idSetInterval);
    };

    this.moveFurry = function () {
        if (self.furry.direction === 'right') {
            self.furry.x = self.furry.x + 1;
        } else if (self.furry.direction === 'left') {
            self.furry.x = self.furry.x - 1;
        } else if (self.furry.direction === 'up') {
            self.furry.y = self.furry.y - 1;
        } else if (self.furry.direction === 'down') {
            self.furry.y = self.furry.y + 1;
        }

        if (!self.isGameOver()) {
            self.showFurry();
            self.checkCoinCollision();
        }
    };

    this.hideVisibleFurry = function () {
        var furry = document.querySelector('.furry');
        if (furry) {
            furry.classList.remove('furry');
        }
    };

    this.turnFurry = function (event) {
        switch (event.keyCode) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };

    this.checkCoinCollision = function () {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            self.board[self.index(self.coin.x, self.coin.y)].classList.remove('coin');
            self.score++;
            scoreMain.innerText = self.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.isGameOver = function () {
        if (self.furry.x < 0 || self.furry.x > 9 || self.furry.y < 0 || self.furry.y > 9) {
            clearInterval(self.idSetInterval);
            Over.classList.remove('invisible');
            self.hideVisibleFurry();
            return true;
        }
        return false;
    };
}

module.exports = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

module.exports = Furry;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(0);

var game = new Game('game');
game.showFurry();
game.showCoin();
game.startGame();

document.addEventListener('keydown', function (event) {
    game.turnFurry(event);
});

/***/ })
/******/ ]);