let deck = [];
let casinoDeck = [];

const suites = {
    0: 'Hearts',
    1: 'Diamonds',
    2: 'Clubs',
    3: 'Spades'
};

let suite;

for(let i = 1; i < 11; i++){
    for(let j = 0; j < 4; j++){
        suite = suites[j];

        if(i == 1){
            deck.push({
                val: 'A',
                actualVal: 1,
                suite: suite
            });

            deck.push({
                val: 'J',
                actualVal: 0,
                suite: suite
            });

            deck.push({
                val: 'Q',
                actualVal: 0,
                suite: suite
            });

            deck.push({
                val: 'K',
                actualVal: 0,
                suite: suite
            });
        }else{
            actualVal = i !== 10 ? i : 0;
            deck.push({
                val: String(i),
                actualVal: actualVal,
                suite: suite
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