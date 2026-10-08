const Task = require("../models/task");

const runTask = async (taskId) => {
  try {
    const task = await Task.findById(taskId).populate("dependencies");
    if (!task) {
      throw new Error('Task not found');
    }
    const blockedDependencies = task.dependencies.some(dep => dep.status === 'blocked' || dep.status === 'failed');
    const completedDependencies = task.dependencies.every(dep => dep.status === 'succeeded');
    if (blockedDependencies) {
      task.status = 'blocked';
      await task.save();
      return;
    }
    if (!completedDependencies) {
      task.status = 'waiting';
      await task.save();
      return;
    }

    task.status = 'running';
    task.attempts += 1;
    await task.save();
    
     setTimeout(async () => {
      const failed = Math.random() < 0.5;

      if (failed) {
        if (task.attempts <= task.retries) {
          task.status = "waiting";
          await task.save();

          runTask(taskId);
        } else {
          task.status = "failed";
          await task.save();
        }
        return;
      }
      task.status = "succeeded";
      await task.save();
    }, 10000);
  } catch (error) {
    throw new Error(`Error running task: ${error.message}`);
  }
};

module.exports = { runTask };