const selector = require('../../utils/radio');
const check = require('./check');
//const result = require('../../utils/console');
const logger = require('./logger');

function randomize() {
    return Math.floor(Math.random() * 2 + 1);
}

function translate(key) {
    const variants = {
        '1': 'heads',
        '2': 'tails'
    };

    return variants[key];
}

function getAI() {
    return translate(randomize());
}

module.exports = async () => {
    let user, pc;
    let winner;
    try {
        pc = getAI();
        user = await selector({
            name: 'HeadsAndTails',
            message: 'Select Unit',
            choices: [
                'heads',
                'tails',
                'exit'
            ]
        });
        winner = check(user, pc);
    }
    catch(err) {
        console.log('Crush ', err);
    }
    finally {
        if(winner) {
            if(user === 'exit')
                return 'exit';
            else
                logger({ winner }, { user, pc });
        } else {
            logger(null);
        }
    }
}