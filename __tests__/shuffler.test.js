const cards = require('../lib/cards.js');
const shuffler = require('../lib/shuffler.js');

test('expect shuffled cards to be the same length as original cards', () => {
    const shuffledCards = shuffler(cards.deck);

    expect(shuffledCards.length).toEqual(cards.deck.length);

});

test('expect shuffled cards to be different than original cards', () => {
    const shuffledCards = shuffler(cards.deck);

    let same = true;

    let shuffledCard;
    let card;

    for(let i = 0; i < shuffledCards.length; i++){
        shuffledCard = shuffledCards[i];
        card = cards.deck[i];

        if(shuffledCard.suite != card.suite || card.val != shuffledCard.val){
            same = false;
        }
    }

    expect(same).toBe(false);
});