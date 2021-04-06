const express = require('express');
const controllers = require('../controllers')

const router = express.Router();

router.get('/', controllers.news.getNews);
router.post('/', controllers.news.getNewsPost);
/* router.post('/:taskId/description/', controllers.task.updateTaskDescription);
router.post('/:taskId/complete/', controllers.task.completeTask);
router.post('/:taskId/assign/', controllers.task.assignTask);
router.post('/:taskId/delete', controllers.task.deleteTask); */

module.exports = router;