const db = require('./db.js');
const config = require('../config');
const fs = require('fs');
const bcryptjs = require('bcryptjs');

class User {

    static async init() {
        if (config.db.cleanOnStartup) {
            await db.execute('DROP TABLE IF EXISTS `users`');
        }

        await db.execute(`CREATE TABLE users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            catnews TINYINT,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE)`);
        
        if (config.db.loadMockupData) {
            const mockups = JSON.parse(fs.readFileSync('./models/mockups/users.json', 'utf8'));
            mockups.forEach(async (mockup) => {
                await User.createUser(mockup);
            })
        }

        console.log('Users table initialised');
    }

    static async createUser(user) {
        const salt = bcryptjs.genSaltSync(config.bcryptjs.saltRounds);
        user.password = bcryptjs.hashSync(user.password, salt);

        const newUser = await db.query('INSERT INTO users(username, password, email, catnews) VALUES (?, ?, ?, ?)', [user.username, user.password, user.email, user.catnews]);
        return newUser;
    }

    static findUserByName(name) {
        const user = db.query('SELECT * from users WHERE username = ?', [name]);
        return user;
    }

    static checkPassword(user, password) {
        return bcryptjs.compareSync(password, user.password);
    }

    static async getCat(username) {
        const user = await db.query('SELECT catnews from users WHERE username = ?', [username]);
        return user;
    }

    static async freshCat(username, cat) {
        const user = await db.query('UPDATE users SET catnews = ? WHERE username = ?', [cat, username]);
        return user;
    }
}

module.exports = User;