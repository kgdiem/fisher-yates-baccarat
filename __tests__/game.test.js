const cards = require('../lib/cards.js');
const shuffler = require('../lib/shuffler.js');
const Game = require('../lib/Game.js');

const playingCards = shuffler(cards.casinoDeck);

test('Drawing a card should increment position in deck', () => {
    const game = new Game(playingCards);

    let currentPosition = game.positionInDeck;

    game.drawCard();

    expect(game.positionInDeck).toEqual(++currentPosition);

});

test('Creating a game should result in burned cards, one card plus an array the length of the first card\'s value', () => {
    const game = new Game(playingCards);

    const burnedCards = game.burnedCards;

    const val = burnedCards.firstCard.actualVal;

    expect(burnedCards.burnCards.length).toEqual(val);

    expect(game.positionInDeck).toBe(val + 1);

});

test('Creating a game should result in a stop-at position between 15-22% of the deck', () => {
    const game = new Game(playingCards);

    const penetration = game.stopAt / game.cards.length;

    expect(penetration).toBeGreaterThan(.14);
    expect(penetration).toBeLessThan(.23);
});

test('Make hand should return an object w/ total of 0 and an empty array for cards', () => {
    const game = new Game(playingCards);

    const hand = game.makeHand();

    expect(hand).toEqual({
        cards: [],
        total: 0
    })
});

test('Dealing cards should result in a player hand and dealer hand w/ length of 2', () => {
    const game = new Game(playingCards);

    game.deal();

    expect(game.playerHand.cards.length).toBe(2);

    expect(game.bankerHand.cards.length).toBe(2);
});

test('Dealing cards should result in player totals of less than 10', () => {
    let game;

    let isAlwaysLessThan10 = true;

    for(let i = 0; i < 1000000; i++){
        game = new Game(playingCards);

        game.deal();

        if(game.playerHand.total >= 10 || game.bankerHand.total >= 10){
            isAlwaysLessThan10 = false;
        }

    }

    expect(isAlwaysLessThan10).toEqual(true);
});

test('checkTotal should make score less than 10', () => {
    const game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 15;
    game.bankerHand.total = 12;

    game.checkTotal();

    expect(game.playerHand.total).toBe(6);
    
    expect(game.bankerHand.total).toBe(3);

});