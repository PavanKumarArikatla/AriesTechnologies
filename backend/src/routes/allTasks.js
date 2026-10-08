const {getAllTasks, createTask, getTaskStatus, runTaskController, cancelTask, runAllTasks} = require('../controllers/taskController');

const express = require('express');
const router = express.Router();

router.get('/stats', getAllTasks);
router.post('/submit', createTask);
router.get('/status/:taskId', getTaskStatus);
router.patch('/cancel/:taskId', cancelTask);
router.post('/run/:taskId', runTaskController);
router.post('/run-all', runAllTasks);

module.exports = router;