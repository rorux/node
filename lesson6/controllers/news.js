const models = require('../models');
const maps = require('../func/maps');
const functions = require('../func/functions');
const request = require('request');
const cheerio = require('cheerio');

exports.getNews = (req, res, next) => {
    if (!req.session.username) {
        res.redirect('/auth/login/')
    } else {
        models.User.getCat(req.session.username).then(([rows, fieldData]) => {
            const catid = rows[0].catnews;
            models.News.getNews(catid, res);
        })
    }
}

exports.getNewsPost = (req, res, next) => {
    console.log(req);
    if (!req.session.username) {
        res.redirect('/auth/login/')
    } else {
        const requestUser = req.body;
        const catid = requestUser.cat;
        models.User.freshCat(req.session.username, catid);
        models.News.getNews(catid, res);
    }
}

