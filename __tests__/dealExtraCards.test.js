const cards = require('../lib/cards.js');
const shuffler = require('../lib/shuffler.js');
const Game = require('../lib/Game.js');

const playingCards = shuffler(cards.casinoDeck);

test('dealExtraCards should add an extra card when playerHand.total is less than 6', () => {
    const game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 5;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);
});

test('dealExtraCards should add an extra card to the bankerHand when playerHand > 5 and bankerHand < 6', () => {
    const game = new Game(playingCards);
    
    game.deal();

    game.playerHand.total = 9;

    game.bankerHand.total = 0;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(2);

});

test('dealExtraCards should add an extra card to the bankerHand when a player card has been added and the banker total is less than 3', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 0;
    game.bankerHand.total = 0;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should deal extra card to banker when bankerTotal is 3 and playerCard != 8', () =>{
    let game = new Game(playingCards);

    game.deal();

    game.drawCard = () => ({actualVal: 3});

    game.playerHand.total = 3;

    game.bankerHand.total = 3;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should deal an extra card when bankerHand is 4 and playerCard > 1 and < 8', () => {
    let game = new Game(playingCards);
    
    game.deal();

    game.drawCard = () => ({actualVal: 3});

    game.playerHand.total = 3;

    game.bankerHand.total = 4;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(3);
});

test('dealExtraCards should deal an extra card when bankerHand is 5 and playerCard > 3 and < 8', () => {
    let game = new Game(playingCards);
    
    game.deal();

    game.drawCard = () => ({actualVal: 4});

    game.playerHand.total = 3;

    game.bankerHand.total = 5;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(3);
});

test('dealExtraCards should deal an extra card when bankerHand is 6 and playerCard > 5 and < 8', () => {
    let game = new Game(playingCards);
    
    game.deal();

    game.drawCard = () => ({actualVal: 7});

    game.playerHand.total = 2;

    game.bankerHand.total = 6;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(3);
});

test('dealExtraCards should deal banker an extra card when banker has 0 and player has 3', () => {
    let game = new Game(playingCards);

    game.deal(); 

    game.playerHand.total = 3;
    game.bankerHand.total = 0;

    game.dealExtraCards();


    expect(game.bankerHand.cards.length).toEqual(3);

    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should deal banker an extra card when banker has 1 and player has 3', () => {
    let game = new Game(playingCards);

    game.deal();
    
    game.playerHand.total = 3;
    game.bankerHand.total = 1;

    game.dealExtraCards();
    
    expect(game.bankerHand.cards.length).toEqual(3);

    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should deal banker an extra card when banker has 2 and player has 3', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 3;
    game.bankerHand.total = 2;

    game.dealExtraCards();


    expect(game.bankerHand.cards.length).toEqual(3);

});

test('dealExtraCards should deal banker an extra card when banker has 2 and player has 0', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 0;
    game.bankerHand.total = 2;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should deal banker an extra card when banker has 2 and player has 7', () => {
    let game = new Game(playingCards);

    game.deal();
    
    game.playerHand.total = 7;
    game.bankerHand.total = 2;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(2);

});

test('dealExtraCards should deal banker an extra card when banker has 2 and player has 6', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 6;
    game.bankerHand.total = 2;

    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toEqual(3);
    expect(game.playerHand.cards.length).toEqual(2);

});

test('dealExtraCards should deal banker an extra card when banker has 3 and player has 3', () => {
    let game = new Game(playingCards);

    game.deal();
    
    game.playerHand.total = 3;
    game.bankerHand.total = 3;

    game.drawCard = () => ({actualVal: 1});

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);
    expect(game.bankerHand.cards.length).toEqual(3);

});

test('dealExtraCards should deal banker an extra card when banker has 3 and player has 5', () => {
    let game = new Game(playingCards);

    game.deal();
    
    game.playerHand.total = 5;
    game.bankerHand.total = 3;

    game.drawCard = () => ({actualVal: 1});

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);
    expect(game.bankerHand.cards.length).toEqual(3);
    
});

test('dealExtraCards should deal banker an extra card when player total is less than banker total and banker total is less than 3', () =>{
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 0;
    game.bankerHand.total = 0;

    game.drawCard = () => ({actualVal: 0});

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);
    expect(game.bankerHand.cards.length).toEqual(3);
});

test('dealExtraCards should not deal banker an extra card when banker has 3 and player\'s third card is an 8', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 3;
    game.bankerHand.total = 3;

    game.drawCard = () => ({actualVal: 8});

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);
    expect(game.bankerHand.cards.length).toEqual(2);

});

test('dealExtraCards should deal banker an extra card when banker has 5 and player\'s draw card is a 7', () => {
    //Create a game, cut deck, burn cards, etc.
    let game = new Game(playingCards);

    //Deal each player 2 cards
    game.deal();

    //Player has 0
    game.playerHand.total = 0;
    //Banker has 5
    game.bankerHand.total = 5;

    //Guarantee each hand has 2 cards
    expect(game.playerHand.cards.length).toEqual(2);
    expect(game.bankerHand.cards.length).toEqual(2);

    //The card that is drawn will be a 7
    game.drawCard = () => ({actualVal: 7});

    //Deal extra cards, the player's draw card will be 7
    game.dealExtraCards();

    //Guarantee that each player has been given a card
    expect(game.playerHand.cards.length).toEqual(3);
    expect(game.bankerHand.cards.length).toEqual(3);

    //Guarantee the cards are a 7
    expect(game.playerHand.cards[2].actualVal).toBe(7);
    expect(game.bankerHand.cards[2].actualVal).toBe(7);
    
});

test('dealExtraCards should deal banker an extra card when banker has 5 and player\'s draw card is a 4', () => {
    //Create a game, cut deck, burn cards, etc.
    let game = new Game(playingCards);

    //Deal each player 2 cards
    game.deal();

    //Player has 0
    game.playerHand.total = 0;
    //Banker has 5
    game.bankerHand.total = 5;

    //Guarantee each hand has 2 cards
    expect(game.playerHand.cards.length).toEqual(2);
    expect(game.bankerHand.cards.length).toEqual(2);

    //The card that is drawn will be a 4
    game.drawCard = () => ({actualVal: 4});

    //Deal extra cards, the player's draw card will be 4
    game.dealExtraCards();

    //Guarantee that each player has been given a card
    expect(game.playerHand.cards.length).toEqual(3);
    expect(game.bankerHand.cards.length).toEqual(3);

    //Guarantee the cards are a 4
    expect(game.playerHand.cards[2].actualVal).toBe(4);
    expect(game.bankerHand.cards[2].actualVal).toBe(4);
    
});

test('dealExtraCards should deal banker an extra card when banker has 5 and player\'s draw card is a 5', () => {
    //Create a game, cut deck, burn cards, etc.
    let game = new Game(playingCards);

    //Deal each player 2 cards
    game.deal();

    //Player has 0
    game.playerHand.total = 0;
    //Banker has 5
    game.bankerHand.total = 5;

    //Guarantee each hand has 2 cards
    expect(game.playerHand.cards.length).toEqual(2);
    expect(game.bankerHand.cards.length).toEqual(2);

    //The card that is drawn will be a 5
    game.drawCard = () => ({actualVal: 5});

    //Deal extra cards, the player's draw card will be 5
    game.dealExtraCards();

    //Guarantee that each player has been given a card
    expect(game.playerHand.cards.length).toEqual(3);
    expect(game.bankerHand.cards.length).toEqual(3);

    //Guarantee the cards are a 5
    expect(game.playerHand.cards[2].actualVal).toBe(5);
    expect(game.bankerHand.cards[2].actualVal).toBe(5);
    
});

test('dealExtraCards should deal banker an extra card when banker has 5 and player\'s draw card is a 6', () => {
    //Create a game, cut deck, burn cards, etc.
    let game = new Game(playingCards);

    //Deal each player 2 cards
    game.deal();

    //Player has 0
    game.playerHand.total = 0;
    //Banker has 5
    game.bankerHand.total = 5;

    //Guarantee each hand has 2 cards
    expect(game.playerHand.cards.length).toEqual(2);
    expect(game.bankerHand.cards.length).toEqual(2);

    //The card that is drawn will be a 6
    game.drawCard = () => ({actualVal: 6});

    //Deal extra cards, the player's draw card will be 6
    game.dealExtraCards();

    //Guarantee that each player has been given a card
    expect(game.playerHand.cards.length).toEqual(3);
    expect(game.bankerHand.cards.length).toEqual(3);

    //Guarantee the cards are a 6
    expect(game.playerHand.cards[2].actualVal).toBe(6);
    expect(game.bankerHand.cards[2].actualVal).toBe(6);
    
});

/**
 * Test for every drawing rule
 */

test('dealExtraCards should draw for player when their total is 0', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 0;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should draw for player when their total is 1', () => {
    let game = new Game(playingCards);

    game.deal();
    
    game.playerHand.total = 1;
    
    game.dealExtraCards();
    
    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should draw for player when their total is 2', () => {
    let game = new Game(playingCards);

    game.deal();
    
    game.playerHand.total = 2;
    
    game.dealExtraCards();
    
    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should draw for player when their total is 3', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 3;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should draw for player when their total is 4', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 4;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should draw for player when their total is 5', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 5;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(3);

});

test('dealExtraCards should not draw for player when their total is 6', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 6;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(2);

});

test('dealExtraCards should not draw for player when their total is 7', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 7;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(2);
    
});

test('dealExtraCards should not draw for player when their total is 8', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 8;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(2);
    
});

test('dealExtraCards should not draw for player when their total is 9', () => {
    let game = new Game(playingCards);

    game.deal();

    game.playerHand.total = 9;

    game.dealExtraCards();

    expect(game.playerHand.cards.length).toEqual(2);
    
});

test('dealExtraCards should draw for banker when total is 0 and player is drawn any card', () => {
    let game = new Game(playingCards);

    for(let i = 1; i < 11; i++){
        game.deal();

        game.bankerHand.total = 0;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(3);
    }
});

test('dealExtraCards should draw for banker when total is 1 and player is drawn any card', () => {
    let game = new Game(playingCards);

    for(let i = 1; i < 11; i++){
        game.deal();

        game.bankerHand.total = 1;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(3);
    }
});

test('dealExtraCards should draw for banker when total is 2 and player is drawn any card', () => {
    let game = new Game(playingCards);

    for(let i = 1; i < 11; i++){
        game.deal();

        game.bankerHand.total = 2;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(3);
    }
});

test('dealExtraCards should draw for banker when total is 3 and player is drawn any card except 8', () => {
    let game = new Game(playingCards);

    for(let i = 1; i < 11; i++){
        game.deal();

        game.bankerHand.total = 3;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        if(i !== 8){
            expect(game.bankerHand.cards.length).toBe(3);
        }
        else{
            expect(game.bankerHand.cards.length).toBe(2);
        }
    }
});

test('dealExtraCards should draw for banker when total is 4 and player is drawn a card from 2-7', () => {
    let game = new Game(playingCards);

    for(let i = 2; i < 8; i++){
        game.deal();

        game.bankerHand.total = 4;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(3);

    }
});

test('dealExtraCards should draw for banker when total is 5 and player is drawn a card from 4 to 7', () => {
    let game = new Game(playingCards);

    for(let i = 4; i < 8; i++){
        game.deal();

        game.bankerHand.total = 5;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(3);
                
    }
});

test('dealExtraCards should draw for banker when total is 6 and player is drawn a card from 6 to 7', () => {
    let game = new Game(playingCards);

    for(let i = 6; i < 8; i++){
        game.deal();

        game.bankerHand.total = 6;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(3);
                
    }
});

test('dealExtraCards should not draw for banker when total is 7 and player is drawn a card from 0 to 9', () => {
    let game = new Game(playingCards);

    for(let i = 0; i < 10; i++){
        game.deal();

        game.bankerHand.total = 7;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(2);
                
    }
});

test('dealExtraCards should not draw for banker when total is 8 and player is drawn a card from 0 to 9', () => {
    let game = new Game(playingCards);

    for(let i = 0; i < 10; i++){
        game.deal();

        game.bankerHand.total = 8;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(2);
                
    }
});

test('dealExtraCards should not draw for banker when total is 9 and player is drawn a card from 0 to 9', () => {
    let game = new Game(playingCards);

    for(let i = 0; i < 10; i++){
        game.deal();

        game.bankerHand.total = 9;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(2);
                
    }
});

test('dealExtraCards should not draw for banker when total is 4 and player is drawn a 1, 8, 9 or 0', () => {
    let game = new Game(playingCards);

    game.deal();

    game.bankerHand.total = 4;
    game.playerHand.total = 0;

    game.drawCard = () => ({actualVal: 0});
    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toBe(2);

    game.deal();
    
    game.bankerHand.total = 4;
    game.playerHand.total = 0;

    game.drawCard = () => ({actualVal: 1});
    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toBe(2);

    game.deal();
    
    game.bankerHand.total = 4;
    game.playerHand.total = 0;

    game.drawCard = () => ({actualVal: 8});
    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toBe(2);

    game.deal();
    
    game.bankerHand.total = 4;
    game.playerHand.total = 0;

    game.drawCard = () => ({actualVal: 9});
    game.dealExtraCards();

    expect(game.bankerHand.cards.length).toBe(2);

});

test('dealExtraCards should not deal a card to the banker when banker total is 5 and player draws 1,2,3,8,9,0', () => {
    let game = new Game(playingCards);

    for(let i = 0; i < 4; i++){
        game.deal();
        
        game.bankerHand.total = 5;
        game.playerHand.total = 0;
    
        game.drawCard = () => ({actualVal: i});
        game.dealExtraCards();
    
        expect(game.bankerHand.cards.length).toBe(2);
    }

    for(let i = 8; i < 10; i++){
        game.deal();
        
        game.bankerHand.total = 5;
        game.playerHand.total = 0;
    
        game.drawCard = () => ({actualVal: i});
        game.dealExtraCards();
    
        expect(game.bankerHand.cards.length).toBe(2);
    }
});

test('dealExtraCards should not deal a card to the banker when banker total is 6 and player draws 1,2,3,4,5,8,9,0', () => {
    let game = new Game(playingCards);

    for(let i = 0; i < 6; i++){
        game.deal();
        
        game.bankerHand.total = 6;
        game.playerHand.total = 0;
    
        game.drawCard = () => ({actualVal: i});
        game.dealExtraCards();
    
        expect(game.bankerHand.cards.length).toBe(2);
    }

    for(let i = 8; i < 10; i++){
        game.deal();
        
        game.bankerHand.total = 6;
        game.playerHand.total = 0;
    
        game.drawCard = () => ({actualVal: i});
        game.dealExtraCards();
    
        expect(game.bankerHand.cards.length).toBe(2);
    }
});

test('dealExtraCards should not deal a card to the banker when total is 7 and player draws 1-10', () => {
    let game = new Game(playingCards);

    for(let i = 0; i < 11; i++){
        game.deal();

        game.bankerHand.total = 7;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(2);
    }
});

test('dealExtraCards should not deal a card to the banker when total is 8 or 9 and player draws 1-10', () => {

    for(let i = 0; i < 11; i++){
        let game = new Game(playingCards);

        game.deal();

        game.bankerHand.total = 8;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(2);

        game.deal();
        
        game.bankerHand.total = 9;
        game.playerHand.total = 0;

        game.drawCard = () => ({actualVal: i});

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(2);
    }

});

test('dealExtraCards should deal a card to the banker when the player stands and banker total is 0 - 5', () => {

    for(let i = 0; i < 6; i++){
        let game = new Game(playingCards);

        game.deal();

        game.playerHand.total = 7;
        game.bankerHand.total = i;

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(3);
        expect(game.playerHand.cards.length).toBe(2);

    }

});

test('dealExtraCards should not deal a card to the banker when their total is 6,7,8,9 and player doesn\'t draw', () => {
    for(let i = 6; i < 10; i++){
        let game = new Game(playingCards);

        game.deal();

        game.playerHand.total = 7;
        game.bankerHand.total = i;

        game.dealExtraCards();

        expect(game.bankerHand.cards.length).toBe(2);
        expect(game.playerHand.cards.length).toBe(2);

    }
});