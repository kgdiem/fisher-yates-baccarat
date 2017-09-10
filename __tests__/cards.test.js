const cards = require('../lib/cards.js');


test('deck has 52 cards', () => {
    expect(cards.deck.length).toBe(52);
});

test('casino deck has 52*8 cards', () => {
    expect(cards.casinoDeck.length).toBe(416);
});

test('deck has all cards', () => {
    expect(cards.deck).toEqual([
        { val: 'A', actualVal: 1, suite: 'Hearts' },
        { val: 'J', actualVal: 0, suite: 'Hearts' },
        { val: 'Q', actualVal: 0, suite: 'Hearts' },
        { val: 'K', actualVal: 0, suite: 'Hearts' },
        { val: 'A', actualVal: 1, suite: 'Diamonds' },
        { val: 'J', actualVal: 0, suite: 'Diamonds' },
        { val: 'Q', actualVal: 0, suite: 'Diamonds' },
        { val: 'K', actualVal: 0, suite: 'Diamonds' },
        { val: 'A', actualVal: 1, suite: 'Clubs' },
        { val: 'J', actualVal: 0, suite: 'Clubs' },
        { val: 'Q', actualVal: 0, suite: 'Clubs' },
        { val: 'K', actualVal: 0, suite: 'Clubs' },
        { val: 'A', actualVal: 1, suite: 'Spades' },
        { val: 'J', actualVal: 0, suite: 'Spades' },
        { val: 'Q', actualVal: 0, suite: 'Spades' },
        { val: 'K', actualVal: 0, suite: 'Spades' },
        { val: '2', actualVal: 2, suite: 'Hearts' },
        { val: '2', actualVal: 2, suite: 'Diamonds' },
        { val: '2', actualVal: 2, suite: 'Clubs' },
        { val: '2', actualVal: 2, suite: 'Spades' },
        { val: '3', actualVal: 3, suite: 'Hearts' },
        { val: '3', actualVal: 3, suite: 'Diamonds' },
        { val: '3', actualVal: 3, suite: 'Clubs' },
        { val: '3', actualVal: 3, suite: 'Spades' },
        { val: '4', actualVal: 4, suite: 'Hearts' },
        { val: '4', actualVal: 4, suite: 'Diamonds' },
        { val: '4', actualVal: 4, suite: 'Clubs' },
        { val: '4', actualVal: 4, suite: 'Spades' },
        { val: '5', actualVal: 5, suite: 'Hearts' },
        { val: '5', actualVal: 5, suite: 'Diamonds' },
        { val: '5', actualVal: 5, suite: 'Clubs' },
        { val: '5', actualVal: 5, suite: 'Spades' },
        { val: '6', actualVal: 6, suite: 'Hearts' },
        { val: '6', actualVal: 6, suite: 'Diamonds' },
        { val: '6', actualVal: 6, suite: 'Clubs' },
        { val: '6', actualVal: 6, suite: 'Spades' },
        { val: '7', actualVal: 7, suite: 'Hearts' },
        { val: '7', actualVal: 7, suite: 'Diamonds' },
        { val: '7', actualVal: 7, suite: 'Clubs' },
        { val: '7', actualVal: 7, suite: 'Spades' },
        { val: '8', actualVal: 8, suite: 'Hearts' },
        { val: '8', actualVal: 8, suite: 'Diamonds' },
        { val: '8', actualVal: 8, suite: 'Clubs' },
        { val: '8', actualVal: 8, suite: 'Spades' },
        { val: '9', actualVal: 9, suite: 'Hearts' },
        { val: '9', actualVal: 9, suite: 'Diamonds' },
        { val: '9', actualVal: 9, suite: 'Clubs' },
        { val: '9', actualVal: 9, suite: 'Spades' },
        { val: '10', actualVal: 0, suite: 'Hearts' },
        { val: '10', actualVal: 0, suite: 'Diamonds' },
        { val: '10', actualVal: 0, suite: 'Clubs' },
        { val: '10', actualVal: 0, suite: 'Spades' } 
    ]);
})