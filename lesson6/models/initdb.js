const User = require('./user.js');

module.exports = async function initDB() {
    await User.init();

    console.log('Database initialised');    
}
