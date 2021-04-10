const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require('./controller');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(router);

router.get('/api/', controller.get);
router.post('/api/:d', controller.add);
router.delete('/api/', controller.remove);
router.put('/api/:d', controller.change);

app.listen(3000);