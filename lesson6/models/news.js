const maps = require('../func/maps');
const functions = require('../func/functions');
const request = require('request');
const cheerio = require('cheerio');

class News {

    static getNews = (catid, res) => {
        const optionList = maps.optionList;
        let newsArr = [];
        request('https://www.kp.ru/'+ optionList[catid][0] +'/', function (error, response, html) {
            if (!error && res.statusCode == 200) {
                var $ = cheerio.load(html);
                $('.styled__DigestItemTitleText-sc-1tputnk-15').each(function(i, element){
                    newsArr.push($(this).text());
                });
                res.render('news', { newsList: newsArr, newsListOption: functions.printList(catid) });
            } else {
                console.log(error, res.statusCode);
                res.status('500').render('error', {})
            }
        });
    }

}

module.exports = News;
