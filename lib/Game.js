/**
 * Game
 * 
 * Maintains game state & methods to modify state
 */
class Game{
    constructor(cards){
        this.cards = cards;
        this.positionInDeck = 0;
        this.gameNumber = 1;
        this.history = [];
        this.burnedCards = {
            firstCard: null,
            burnCards: [],
        };

        this.cutDeck();

        this.burnCards();
    }

    /**
     * deal
     * 
     * Deals cards, 2 for the player and 2 for the dealer
     * 
     * returns void
     */
    deal(){
        this.playerHand = this.makeHand();
        this.bankerHand = this.makeHand();

        let playerCard;
        let bankerCard; 
        
        playerCard = this.drawCard();
        
        this.playerHand.cards.push(playerCard);
        this.playerHand.total += playerCard.actualVal;

        bankerCard = this.drawCard();

        this.bankerHand.cards.push(bankerCard);
        this.bankerHand.total += bankerCard.actualVal;

        playerCard = this.drawCard();
        
        this.playerHand.cards.push(playerCard);
        this.playerHand.total += playerCard.actualVal;

        bankerCard = this.drawCard();
        
        this.bankerHand.cards.push(bankerCard);
        this.bankerHand.total += bankerCard.actualVal;

        this.checkTotal();
    }

    /**
     * checkTotal
     * 
     * checks the total of player's hands. Ensures they're less than 10.
     * 
     * return void
     */
    checkTotal(){
        const playerTotal = this.playerHand.total;
        const bankerTotal = this.bankerHand.total;
        
        if(playerTotal >= 10)
            this.playerHand.total = playerTotal % 9;

        if(bankerTotal >= 10)
            this.bankerHand.total = bankerTotal % 9;
        
    }

    /**
     * drawCard
     * 
     * Draws a card from the deck and increments positionInDeck
     * 
     * return void
     */
    drawCard(){
        //Get a card
        const card = this.cards[this.positionInDeck];

        //Increment the position in the deck
        this.positionInDeck++;

        //Return the card that was drawn
        return card;
    }

    /**
     * makeHand
     * 
     * Creates a hand object
     * 
     * return void
     */
    makeHand(){
        //Each hand has cards and a total
        return {
            cards: [],
            total: 0
        };
    }

    /**
     * burnCards 
     * 
     * Burns cards at the beginning of the deck, 1 - N where N is the value of the first card.
     * 
     * return void
     */
    burnCards(){
        //Draw a card
        const firstCard = this.drawCard();

        //Save the first card
        this.burnedCards.firstCard = firstCard;

        //Draw X number of cards where X is the value of the first card
        //Save them to the burned cards array
        for(let i = 1; i <= firstCard.actualVal; i++){
            this.burnedCards.burnCards.push(this.drawCard());
        }
    }

    /**
     * cutDeck
     * 
     * Selects where to stop, random between 15-22%
     * 
     * return void
     */
    cutDeck(){
        //Random % between 15-22,
        const penetration = (Math.floor(Math.random() * 7) + 15)/100; 

        //Set stopAt to be an index in the cards array.
        this.stopAt = Math.floor(this.cards.length * penetration);

    }

}

module.exports = Game;