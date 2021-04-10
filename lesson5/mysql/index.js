const mysql2 = require('mysql2');
const mysqlConnect = require('./connect');
const mysqlFunc = require('./mysql');

const pool = mysql2.createPool(mysqlConnect.options).promise();

const sqlSelect = { 
    source: 'mytable',
    fields: '*',
    where: 'id < 5',
    order: 'id DESC',
    limit: 2
};
mysqlFunc.list(pool, sqlSelect);

const sqlInsert = {
    source: 'mytable',
    fields: ['title', 'category', 'url'],
    data: ['"Статья"', '"Категория"', '"article"']
};
//mysqlFunc.add(pool, sqlInsert);

const sqlDelete = {
    source: 'mytable',
    where: 'id = 8'
};
//mysqlFunc.remove(pool, sqlDelete);

const sqlUpdate = {
    source: 'mytable',
    set: 'title = "Статья33", url = "article33"',
    where: 'id = 7'
};
//mysqlFunc.change(pool, sqlUpdate);