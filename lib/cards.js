let deck = [];
let casinoDeck = [];

const suites = {
    0: 'Hearts',
    1: 'Diamonds',
    2: 'Clubs',
    3: 'Spades'
};

for(let i = 1; i < 11; i++){
    for(let j = 0; j < 4; j++){
        if(i == 1){
            deck.push({
                val: 'A',
                actualVal: 1,
                suite: suites[j]
            });

            deck.push({
                val: 'J',
                actualVal: 10,
                suite: suites[j]
            });

            deck.push({
                val: 'Q',
                actualVal: 10,
                suite: suites[j]
            });

            deck.push({
                val: 'K',
                actualVal: 10,
                suite: suites[j]
            });
        }else{
            deck.push({
                val: String(i),
                actualVal: i,
                suite: suites[j]
            });
        }
    }
}

for(i = 0; i < 8; i++){
    casinoDeck = casinoDeck.concat(deck);
}

module.exports = {
    'deck': deck,
    'casinoDeck': casinoDeck
};