const Task = require('../models/task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { taskName, status, dependencies, retries, attempts } = req.body;

  try {
    const task = await Task.create({ taskName, status, dependencies, retries, attempts });
    if(!task) {
      return res.status(400).json({ message: 'Task creation failed' });
    }
    // const interval = setInterval(() => {
    //   res.status(201).json(task);
    // }, 1000);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTaskStatus = async (req, res) => {
  const { taskName } = req.params;
    try {
    const task = await Task.findOne({ taskName });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelTask = async (req, res) => {
  const { taskName } = req.params;
  try {
    const task = await Task.findOne({ taskName });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.status = 'cancelled';
    await task.save();
    res.json({ message: 'Task cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskStatus,
  cancelTask
};