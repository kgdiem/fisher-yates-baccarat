module.exports = function shuffler(cards){
    let shuffledCards = cards.slice();

    let length = shuffledCards.length;
    
    let indexInDeck = (shuffledCards.length - 1);
    
    let randomNumber, swap;

    for(indexInDeck; indexInDeck >= 1; indexInDeck--){
        randomNumber = getRandomNumber(indexInDeck);

        swap = shuffledCards[randomNumber];

        shuffledCards[randomNumber] = shuffledCards[indexInDeck];

        shuffledCards[indexInDeck] = swap;
    }

    return shuffledCards;
}

function getRandomNumber(max){
    return Math.floor(Math.random() * max);
}
