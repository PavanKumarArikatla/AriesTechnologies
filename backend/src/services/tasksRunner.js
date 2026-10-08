const Task = require("../models/task");
const { runTask } = require("./runTask")

const taskRunner = async () => {
  try {
    const tasks = await Task.find({ status: "waiting" }).populate("dependencies");
    for (const task of tasks) {
      const dependenciesSucceeded = task.dependencies.every(
        (dependency) => dependency.status === "succeeded"
      );
      const blockedDependencies = task.dependencies.some(
        (dependency) => dependency.status === "failed" || dependency.status === "blocked"
      );
      if (blockedDependencies) {
        task.status = "blocked";
        await task.save();
        continue;
      }
      if(!dependenciesSucceeded) {
        continue;
      }

      task.status = "running";
      task.attempts += 1;
      await task.save();

      await runTask(task);
    }
  } catch (error) {
    console.error(`Error in task runner: ${error.message}`);
  }
};

module.exports = { taskRunner }