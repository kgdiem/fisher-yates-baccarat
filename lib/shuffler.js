module.exports = function shuffler(cards){
    let shuffledCards = cards.slice();

    let length = shuffledCards.length;
    let j, swap;

    for(let i = shuffledCards.length - 1; i >= 1; i--){
        j = getRandomNumber(i);

        swap = shuffledCards[j];

        shuffledCards[j] = shuffledCards[i];

        shuffledCards[i] = swap;
    }

    return shuffledCards;
}

function getRandomNumber(max){
    return Math.floor(Math.random() * max);
}
