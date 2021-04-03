const models = require('../models');

exports.getLogin = (req, res, next) => {
    if (!req.session.username) {
        res.render('login', {})
    } else {
        res.redirect('/news/')
    }
}

exports.postLogin = (req, res, next) => {
    /* if(!req.body.remember) {
        res.cookie('destroy', 'ok', { expires: new Date(Date.now() + 900000), httpOnly: true });
    } */
    const user = models.User.findUserByName(req.body.username).then (([user, fieldData]) => {
        if (user.length>0) {
            user = user[0];
            console.log(user);
            
            if (models.User.checkPassword(user, req.body.password)) {
                req.session.username = req.body.username;
                res.redirect('/news/');
            } else {
                res.redirect('/auth/login/')
            }
        } else {
            res.redirect('/auth/login/');
        }
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

exports.getSignup = (req, res, next) => {
    if (!req.session.username) {
        res.render('signup', {})
    } else {
        res.redirect('/news/')
    }
}

exports.postSignup = (req, res, next) => {
    models.User.createUser(req.body);
    res.redirect('/auth/login/');
}