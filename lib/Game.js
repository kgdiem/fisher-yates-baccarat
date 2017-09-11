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
        this.stopAt = null;
        this.history = [];
        this.burnedCards = {
            firstCard: null,
            burnCards: [],
        };

        this.cutDeck();

        this.burnCards();
    }

    dealRound(){
        if(this.cards.length - this.positionInDeck <= this.stopAt){
            return false;
        }

        this.deal();

        const naturalWin = this.checkNaturalWin();
        let tie = (this.playerHand.total == this.bankerHand.total);

        if(naturalWin){
            let resultObj = {};

            resultObj.winner = this.playerHand.win ? 'player' : 'banker';
            resultObj.playerHand = this.playerHand;
            resultObj.bankerHand = this.bankerHand;

            this.history.push(resultObj);

            return;
        }
        else if(tie){
            let resultObj = {};
            
            resultObj.winner = 'tie';
            resultObj.playerHand = this.playerHand;
            resultObj.bankerHand = this.bankerHand;

            this.history.push(resultObj);

            return;
        }

        let playerCard;

        if(this.playerHand.total < 6){
            playerCard = this.dealCard(this.playerHand);

            if(this.playerHand.total < this.bankerHand.total){
                let resultObj = {};
                
                resultObj.winner = 'banker';
                resultObj.playerHand = this.playerHand;
                resultObj.bankerHand = this.bankerHand;
    
                this.history.push(resultObj);
    
                return;
            }
        }
        else if(this.bankerHand.total < 6){
            
        }

        if(playerCard){
            if(this.bankerHand.total < 3){
                this.dealCard(this.bankerHand);
            }
            else if(this.bankerHand.total === 3 && playerCard.actualVal !== 8){
                this.dealCard(this.bankerHand);
            }
            else if(this.bankerHand.total === 4 && (playerCard.actualVal > 1 && playerCard.actualVal < 8)){
                this.dealCard(this.bankerHand);
            }
            else if(this.bankerHand.total === 5 && (playerCard.actualVal > 3 && playerCard.actualVal < 8)){
                this.dealCard(this.bankerHand);
            }
            else if(this.bankerHand.total === 6 && (playerCard.actualVal > 5 && playerCard.actualVal < 8)){
                this.dealCard(this.bankerHand);
            }
        }

        this.checkTotal();

        tie = (this.playerHand.total == this.bankerHand.total);

        if(this.playerHand.total < this.bankerHand.total){
            this.bankerHand.win = true;
        }
        else if(this.playerHand.total > this.bankerHand.total){
            this.playerHand.win = true;
        }
        else{
            let resultObj = {};
            
            resultObj.winner = 'tie';
            resultObj.playerHand = this.playerHand;
            resultObj.bankerHand = this.bankerHand;

            this.history.push(resultObj);

            return;
        }

        let resultObj = {};
        
        resultObj.winner = this.playerHand.win ? 'player' : 'banker';
        resultObj.playerHand = this.playerHand;
        resultObj.bankerHand = this.bankerHand;

        this.history.push(resultObj);

        return;
    }

    /**
     * deal
     * 
     * Deals cards, 2 for the player and 2 for the dealer
     * 
     * @return boolean | game over
     */
    deal(){
        this.playerHand = this.makeHand();
        this.bankerHand = this.makeHand();

        let playerCard;
        let bankerCard; 
        
        this.dealCard(this.playerHand);

        this.dealCard(this.bankerHand);

        this.dealCard(this.playerHand);

        this.dealCard(this.bankerHand);

    }

    /**
     * checkTotal
     * 
     * checks the total of player's hands. Ensures they're less than 10.
     * 
     * @return void
     */
    checkTotal(){
        const playerTotal = this.playerHand.total;
        const bankerTotal = this.bankerHand.total;
        
        let total;

        if(playerTotal >= 10){
            total = playerTotal - 10;

            this.playerHand.total = total;
        }

        if(bankerTotal >= 10){
            total = bankerTotal - 10;

            this.bankerHand.total = total;

        }
        
    }

    /**
     * dealCard
     * 
     * Draws a card and adds it to hand
     * 
     * @param {*} hand 
     * 
     * @return {*} card 
     */
    dealCard(hand){

        let card = this.drawCard();

        hand.cards.push(card);
        hand.total += card.actualVal;

        this.checkTotal();
        
        return card;
    }

    /**
     * drawCard
     * 
     * Draws a card from the deck and increments positionInDeck
     * 
     * @return void
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
     * @return void
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
     * @return void
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
     * @return void
     */
    cutDeck(){
        //Random % between 15-22,
        const penetration = (Math.floor(Math.random() * 7) + 15)/100; 

        //Set stopAt to be an index in the cards array.
        this.stopAt = Math.floor(this.cards.length * penetration);

    }

    /**
     * checkNaturalWin
     * 
     * Checks wether there was a natural win or not
     * 
     * @return boolean | natural win
     */
    checkNaturalWin(){
        let win = false;

        //Player has natural 9
        if(this.playerHand.total === 9 && this.bankerHand.total <= 8 || 
            //Player has natural 8
            this.playerHand === 8 && this.bankerHand.total <= 7 
        ){
            this.playerHand.win = true;
            win = true;
        }
        //Banker has a natural 9
        else if(this.bankerHand.total === 9 && this.playerHand.total <= 8 || 
            //Player has natural 8
            this.bankerHand.total === 8 && this.playerHand.total <= 7 
        ){
            this.bankerHand.win = true;
            win = true;
        }

        return win;
    }

}

module.exports = Game;