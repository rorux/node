const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const optionList = [
    ["daily/koronavirus", "Коронавирус"],
    ["politics", "Политика"],
    ["economics", "Экономика"],
    ["sport", "Спорт"],
    ["society", "Общество"],
    ["incidents", "Происшествия"],
    ["health", "Здоровье"]
];

const getCatid = () => {
    let catIdList = [];
    optionList.forEach((element, index) => {
        catIdList.push(index);
    });
    return catIdList;
}

const printList = (catid) => {
    let listOption = [];
    optionList.forEach((element, index) => {
        (+catid === index) ? listOption.push({catid: index, title: element[1], select: 'selected'}) : listOption.push({catid: index, title: element[1], select: ''});
    });
    return listOption;
};

app.get('/', (req, res) => {
    const catidCookie = +req.cookies.catnews;
    const catidGet = +req.query.catid;
    if(getCatid().indexOf(catidGet) != -1) {
        let newsArr = [];
        request('https://www.kp.ru/'+ optionList[catidGet][0] +'/', function (error, response, html) {
            if (!error && res.statusCode == 200) {
                var $ = cheerio.load(html);
                $('.styled__DigestItemTitleText-sc-1tputnk-15').each(function(i, element){
                    newsArr.push($(this).text());
                });
                res.render('news', { newsList: newsArr, newsListOption: printList(catidGet) });
            } else {
                console.log(error, res.statusCode);
                res.status('500').render('error', {})
            }
        });
    }
    else if(getCatid().indexOf(catidCookie) != -1) {
        let newsArr = [];
        request('https://www.kp.ru/'+ optionList[catidCookie][0] +'/', function (error, response, html) {
            if (!error && res.statusCode == 200) {
                var $ = cheerio.load(html);
                $('.styled__DigestItemTitleText-sc-1tputnk-15').each(function(i, element){
                    newsArr.push($(this).text());
                });
                res.render('news', { newsList: newsArr, newsListOption: printList(catidCookie) });
            } else {
                console.log(error, res.statusCode);
                res.status('500').render('error', {})
            }
        });
    } else {
        res.render('index');
    }
});

app.post('/news', (req, res) => {
    const requestUser = req.body;
    let newsArr = [];
    request('https://www.kp.ru/'+ optionList[requestUser.cat][0] +'/', function (error, response, html) {
        if (!error && res.statusCode == 200) {
            var $ = cheerio.load(html);
            $('.styled__DigestItemTitleText-sc-1tputnk-15').each(function(i, element){
                newsArr.push($(this).text());
            });
            res.cookie('catnews', requestUser.cat, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.render('news', { newsList: newsArr, newsListOption: printList(requestUser.cat) });
        } else {
            console.log(error, res.statusCode);
            res.status('500').render('error', {})
        }
    });
});




app.listen(3000, () => console.log('Listening on port 3000'));