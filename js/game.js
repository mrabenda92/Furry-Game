var Game = require('./app.js');

const game = new Game('game');
game.showFurry();
game.showCoin();
game.startGame();

document.addEventListener('keydown', function(event) {
    game.turnFurry(event);
});