const Radio = require('prompt-radio');

module.exports = async options => {
    const radio = new Radio(options);

    try {
        const answer = await radio.run();
        return answer;
    }
    catch(err) {
        return err;
    }
}