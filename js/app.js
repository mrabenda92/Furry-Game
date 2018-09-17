const Furry = require('./furry.js');
const Coin = require('./coin.js');

const scoreMain = document.querySelector('#score strong');
const Over = document.querySelector('#over');


function Game() {
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    const self = this;
    this.board = document.querySelectorAll('#board div');
    this.index = function(x, y) {
        return x + (y * 10);
    }

    this.showFurry = function() {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

    }

    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250)
    }

    this.stopGame = function() {
        clearInterval(this.idSetInterval);
    }

    this.moveFurry = function() {
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

    }

    this.hideVisibleFurry = function() {
        const furry = document.querySelector('.furry');
        if (furry) {
            furry.classList.remove('furry');
        }

    }

    this.turnFurry =
        function(event) {
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
        }

    this.checkCoinCollision = function() {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            self.board[self.index(self.coin.x, self.coin.y)].classList.remove('coin');
            self.score++;
            scoreMain.innerText = self.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    this.isGameOver = function() {
        if (self.furry.x < 0 || self.furry.x > 9 || self.furry.y < 0 || self.furry.y > 9) {
            clearInterval(self.idSetInterval);
            Over.classList.remove('invisible');
            self.hideVisibleFurry();
            return true;
        }
        return false;
    }
}

module.exports = Game;