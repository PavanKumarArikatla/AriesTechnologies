const Task = require("../models/task");
const { taskRunner } = require('../services/tasksRunner');

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
    taskRunner();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTaskStatus = async (req, res) => {
  const { taskId } = req.params;
    try {
    const task = await Task.findOne({ taskId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const runTaskController = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.status = "waiting";
    task.attempts = 0;
    await task.save();

    await taskRunner();

    res.json({ message: "Task re-run initiated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const runAllTasks = async (req, res) => {
  try {
    await Task.updateMany(
      {},
      {
        $set: {
          status: "waiting",
          attempts: 0
        }
      }
    );

    taskRunner();

    res.json({
      message: "All tasks reset and execution started"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const cancelTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
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
  cancelTask,
  runTaskController,
  runAllTasks
};