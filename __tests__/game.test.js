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

    if(val != 0){
        expect(burnedCards.burnCards.length).toEqual(val);
    }
    else{
        expect(burnedCards.burnCards.length).toEqual(10);
    }

});

test('Creating a game should result in the position in the deck to be after the burned cards', () => {
    const game = new Game(playingCards);

    const burnedCards = game.burnedCards;

    const val = burnedCards.firstCard.actualVal === 0 ? 10 : burnedCards.firstCard.actualVal;

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

    game.checkTotal(game.playerHand);
    game.checkTotal(game.bankerHand);

    expect(game.playerHand.total).toBe(5);
    
    expect(game.bankerHand.total).toBe(2);

    game.playerHand.total = 11;
    game.bankerHand.total = 8;

    game.checkTotal(game.playerHand);
    game.checkTotal(game.bankerHand);

    expect(game.playerHand.total).toBe(1);
    
    expect(game.bankerHand.total).toBe(8);

    game.playerHand.total = 18;
    game.bankerHand.total = 14;

    game.checkTotal(game.playerHand);
    game.checkTotal(game.bankerHand);

    expect(game.playerHand.total).toBe(8);
    
    expect(game.bankerHand.total).toBe(4);

    game.playerHand.total = 10;
    game.bankerHand.total = 9;

    game.checkTotal(game.playerHand);
    game.checkTotal(game.bankerHand);

    expect(game.playerHand.total).toBe(0);
    
    expect(game.bankerHand.total).toBe(9);

});

test('checkNaturalWin returns true when there is a natural win', () => {
    const game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 9;
    game.bankerHand.total = 8;

    expect(game.checkNaturalWin()).toEqual(true);
    expect(game.playerHand.win).toEqual(true);

    game.playerHand.total = 8;
    game.bankerHand.total = 9;

    expect(game.checkNaturalWin()).toEqual(true);
    expect(game.playerHand.win).toEqual(true);

    game.bankerHand.total = 8;
    game.playerHand.total = 7;

    expect(game.checkNaturalWin()).toEqual(true);
    expect(game.bankerHand.win).toBe(true);

    game.bankerHand.total = 9;
    game.playerHand.total = 8;

    expect(game.checkNaturalWin()).toEqual(true);
    expect(game.bankerHand.win).toBe(true);

});

test('checkNaturalWin returns false when there is a natural win', () => {
    const game = new Game(playingCards);
    
    game.deal();

    game.playerHand.total = 0;
    game.bankerHand.total = 1;

    expect(game.checkNaturalWin()).toEqual(false);

    expect(game.playerHand.win).toBe(undefined);
    expect(game.bankerHand.win).toBe(undefined);

    game.bankerHand.total = 1;
    game.playerHand.total = 0;

    expect(game.checkNaturalWin()).toEqual(false);
    expect(game.playerHand.win).toBe(undefined);
    expect(game.bankerHand.win).toBe(undefined);

});

test('dealRound should return false if stopAt is greater than or equal to the current position in the deck', () =>{
    const game = new Game(playingCards);

    game.stopAt = 416;

    expect(game.dealRound()).toEqual(false);
});

test('dealRound should result in a history object', () => {
    const game = new Game(playingCards);

    game.dealRound();

    expect(game.history.length).toEqual(1);

});

test('dealRound should have correct winner', () => {
    const game = new Game(playingCards);
    
    let i = 0;
    let historyObj;

    while(game.dealRound() !== false){

        historyObj = game.history[i];

        if(historyObj.winner == 'tie'){
            expect(historyObj.bankerHand.total).toEqual(historyObj.playerHand.total);
        }
        else if(historyObj.winner == 'player'){
            expect(historyObj.bankerHand.total).toBeLessThan(historyObj.playerHand.total);
        }
        else{
            expect(historyObj.bankerHand.total).toBeGreaterThan(historyObj.playerHand.total);
        }

        i++;
    }

});

test('dealHand should add a card to the hand and increment total', () => {

    const game = new Game(playingCards);

    game.deal();

    const nextCard = game.cards[game.positionInDeck];

    const totalBeforeIncrementing = game.playerHand.total;
    const cardsBeforeIncrementing = game.playerHand.cards;

    let nextTotal = nextCard.actualVal + totalBeforeIncrementing;

    if(nextTotal >= 10){
        nextTotal = nextTotal - 10;
    }
    
    game.dealCard(game.playerHand);

    expect(game.playerHand.total).toEqual(nextTotal);

    expect(game.playerHand.cards[2]).toBe(nextCard);

});

test('addHistory should add correct history', () => {
    const game = new Game(playingCards);

    game.dealRound();

    expect(game.history[0].playerHand).toEqual(game.playerHand);
    expect(game.history[0].bankerHand).toEqual(game.bankerHand);

    game.dealRound();
    
    expect(game.history[1].playerHand).toEqual(game.playerHand);
    expect(game.history[1].bankerHand).toEqual(game.bankerHand);
});

test('burnCards should burn 10 cards when a 10, J, Q, K, A is drawn', () => {
    const drawCard = Game.prototype.drawCard;

    Game.prototype.drawCard = () => ({actualVal: 0});

    const game = new Game(playingCards);

    expect(game.burnedCards.burnCards.length).toBe(10);

    Game.prototype.drawCard = drawCard;
});

test('burnCards should burn value of first card when non-10 card is drawn', () => {
    const drawCard = Game.prototype.drawCard;

    Game.prototype.drawCard = () => ({actualVal: 3});

    const game = new Game(playingCards);

    expect(game.burnedCards.burnCards.length).toBe(3);

    Game.prototype.drawCard = drawCard;
});
