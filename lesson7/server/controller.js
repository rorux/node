const fs = require('fs');
const path = require('path');
const digitsJson = path.join(__dirname, 'list.json');

const get = (request, response) => {

    fs.readFile(digitsJson, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0, list: err });
            return;
        }

        response.send(data);
    })
}

const add = (request, response) => {

    fs.readFile(digitsJson, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0 });
            return;
        }
        const digitsArr = JSON.parse(data); // { result: '1', list: [ '2', '4', '5' ] }
        digitsArr.list.push(request.params.d);
        fs.writeFile(digitsJson, JSON.stringify(digitsArr), (err) => {
            if (err) {
                console.log(err);
                res.send({ result: 0 });
                return;
            }
            response.send({ result: 1 });
        })
        
    })
}

const remove = (request, response) => {

    fs.readFile(digitsJson, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0 });
            return;
        }
        const digitsArr = JSON.parse(data); // { result: '1', list: [ '2', '4', '5' ] }
        digitsArr.list.pop();
        fs.writeFile(digitsJson, JSON.stringify(digitsArr), (err) => {
            if (err) {
                console.log(err);
                res.send({ result: 0 });
                return;
            }
            response.send({ result: 1 });
        })
        
    })
}

const change = (request, response) => {

    fs.readFile(digitsJson, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0 });
            return;
        }
        const digitsArr = JSON.parse(data); // { result: '1', list: [ '2', '4', '5' ] }
        digitsArr.list.pop();
        digitsArr.list.push(request.params.d);
        fs.writeFile(digitsJson, JSON.stringify(digitsArr), (err) => {
            if (err) {
                console.log(err);
                res.send({ result: 0 });
                return;
            }
            response.send({ result: 1 });
        })
        
    })
}

module.exports = {
    get,
    add,
    remove,
    change
};