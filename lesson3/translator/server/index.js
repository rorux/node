const express = require('express');
const axios = require('axios');
const app = express();

const IAM_TOKEN = 't1.9euelZqeyp2cyYrPnI2czpfOy56Oi-3rnpWalpPPmseYlMyOi4uJyYzMnZTl8_cKCxJ9-e8vK2pt_N3z90o5D3357y8ram38.rVqMot9y7tMT5XLnDR4MWT3VQGhrUoCo4DHIPwVkhNLcdQiR7ZJGUAma7j0GuyCij5sOsbA-qCAd_aBc-dgmDw';
const FOLDER = 'b1ggpv6u3pk8obl492s7'

app.use(express.json());
app.use('/', express.static('public'));

app.get('/api/?', (request, response) => {
    axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
            "folder_id": FOLDER,
            "texts": [request.query.in],
            "targetLanguageCode": "ru" 
        }, {
            headers: {
                'Content-Type': 'aaplication/json',
                'Authorization': 'Bearer ' + IAM_TOKEN
            }
        })
        .then((res) => {
            response.send(res.data["translations"][0]);
        }).catch((err) => {
            console.log(err);
        })
});

app.listen(3000);