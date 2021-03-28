const fs = require('fs');
const urlLog = './logs/log.txt';

fs.readFile(urlLog, 'utf8', (err, data) => {
    if (err) throw err;
    let matches = data.split('\n');

    let wins = 0; // счетчик общего количества побед
    let loses = 0; // счетчик общего количества поражений
    let someWins = 0; // счетчик побед подряд
    let someLoses = 0; // счетчик поражений подряд
    let winsRow = []; // массив счетчиков побед подряд
    let losesRow = []; // массив счетчиков поражений подряд

    let matchesTotal = matches.length;
    console.log('Сыграно партий: ' + matchesTotal);

    matches.forEach((value, index) => {
        if(value.search(/.+WINS.+/) != -1) {
            wins++;
            someWins++;
            if(someLoses) {
                losesRow.push(someLoses);
                someLoses = 0;
            }
            if(index == matchesTotal - 1)
                winsRow.push(someWins);
        }
            
        if(value.search(/.+LOSES.+/) != -1) {
            loses++;
            someLoses++;
            if(someWins) {
                winsRow.push(someWins);
                someWins = 0;
            }
            if(index == matchesTotal - 1)
                losesRow.push(someLoses);
        } 
    });

    console.log('Выиграно партий: ' + wins);
    console.log('Проиграно партий: ' + loses);
    console.log('Наибольшее количество выигранных партий подряд: ' + Math.max.apply(null, winsRow));
    console.log('Наибольшее количество проигранных партий подряд: ' + Math.max.apply(null, losesRow));
});

