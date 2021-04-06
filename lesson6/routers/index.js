const express = require('express');

const mainRouter = require('./main.js');
const userRouter = require('./user.js');
const authRouter = require('./auth.js');
const newsRouter = require('./news.js');

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/news', newsRouter);
router.use(mainRouter);

module.exports = router;