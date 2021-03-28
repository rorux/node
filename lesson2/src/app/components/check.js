module.exports = (user, pc) => {
    let winner;

    if(user === pc) {
        winner = 'User';
    } else {
        winner = 'PC';
    }

    return winner;
};