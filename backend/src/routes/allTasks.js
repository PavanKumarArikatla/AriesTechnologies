const {getAllTasks, createTask, getTaskStatus, runTaskController, cancelTask} = require('../controllers/taskController');

const express = require('express');
const router = express.Router();

router.get('/stats', getAllTasks);
router.post('/submit', createTask);
router.get('/status/:taskName', getTaskStatus);
router.patch('/cancel/:taskId', cancelTask);
router.post('/run/:taskId', runTaskController);

module.exports = router;