const {getAllTasks, createTask, getTaskStatus, cancelTask} = require('../controllers/taskController');

const express = require('express');
const router = express.Router();

router.get('/stats', getAllTasks);
router.post('/submit', createTask);
router.get('/status/:taskName', getTaskStatus);
router.patch('/cancel/:taskName', cancelTask);

module.exports = router;