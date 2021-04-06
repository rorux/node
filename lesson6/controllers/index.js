const cookieParser = require('cookie-parser');
const main = require('./main.js');
const user = require('./user.js');
const auth = require('./auth.js');
const news = require('./news.js');

module.exports = {
    main, user, auth, news
}