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

        const playerTotal = this.playerHand.total;

        if(playerTotal >= 10)
            this.playerHand.total = playerTotal % 10;

        const bankerTotal = this.bankerHand.total;
        if(bankerTotal >= 10)
            this.bankerHand.total = bankerTotal % 10;

    }

    drawCard(){
        const card = this.cards[this.positionInDeck];

        this.positionInDeck++;

        return card;
    }

    makeHand(){
        return {
            cards: [],
            total: 0
        };
    }

    burnCards(){
        const firstCard = this.drawCard();

        this.burnedCards.firstCard = firstCard;

        for(let i = 1; i <= firstCard.actualVal; i++){
            this.burnedCards.burnCards.push(this.drawCard());
        }
    }

    cutDeck(){
        //Random % between 15-22,
        const penetration = (Math.floor(Math.random() * 7) + 15)/100; 

        this.stopAt = Math.floor(this.cards.length * penetration);
        
    }
}

module.exports = Game;