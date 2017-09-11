const cards = require('./lib/cards.js');
const shuffler = require('./lib/shuffler.js');
const Game = require('./lib/Game.js');

let shuffledCards = shuffler(cards.casinoDeck);

const game = new Game(shuffledCards);

let i = 0;
let histObj;

while(game.dealRound() !== false){
    console.log(`Game ${i}`);

    histObj = game.history[i];

    console.log(`Winner: ${histObj.winner}`);
    console.log("Player hand: ");
    console.log(histObj.playerHand.cards);
    console.log(`Player total: ${histObj.playerHand.total}`);

    console.log("Banker hand: ");
    console.log(histObj.bankerHand.cards);
    console.log(`Banker total: ${histObj.bankerHand.total}`);

    console.log('=================================');
    i++;

};

console.log(`Card penetration for this shoe: ${1-(game.stopAt/game.cards.length)}%`);

process.exit();
