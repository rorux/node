const moment = require('moment');
const writer = require('../../utils/writer');
const urlLog = './logs/log.txt';

module.exports = async ({ winner }, { user, pc }) => {
    let log;

    if(winner) {
        if(winner === 'User') {
            console.log('User WINS');
            log = `${ moment().format('LLL') } === User WINS; User: ${ user }; PC: ${ pc };`
        }
        else if(winner === 'PC') {
            console.log('User LOSES');
            log = `${ moment().format('LLL') } === User LOSES; User: ${ user }; PC: ${ pc };`
        }
        else {
            console.log('ERROR!');
            log = `${ moment().format('LLL') } === ERR`;
        }
    } else {
        console.log('ERROR!');
        log = `${ moment().format('LLL') } === ERR`;
    }

    try {
        await writer(urlLog, log);
        return true;
    }
    catch {
        return false;
    }
}