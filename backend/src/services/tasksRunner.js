const Task = require("../models/task");
const { runTask } = require("./runTask");

const MAX_CONCURRENCY = process.env.CONCURRENCY_LIMIT || 2;

let runningTasks = 0;
let isScheduling = false;

const taskRunner = async () => {
  if (isScheduling) {
    return;
  }

  isScheduling = true;

  try {
    while (runningTasks < MAX_CONCURRENCY) {
      const tasks = await Task.find({
        status: "waiting"
      })
        .populate("dependencies")
        .sort({ createdAt: 1 });

      let taskStarted = false;

      for (const task of tasks) {
        if (runningTasks >= MAX_CONCURRENCY) break;

        const blocked = task.dependencies.some(
          (dependency) =>
            dependency.status === "failed" ||
            dependency.status === "blocked"
        );

        if (blocked) {
          task.status = "blocked";
          await task.save();
          continue;
        }

        const ready = task.dependencies.every(
          (dependency) => dependency.status === "succeeded"
        );

        if (!ready) {
          continue;
        }

        task.status = "running";
        task.attempts += 1;
        await task.save();

        runningTasks++;
        taskStarted = true;

        runTask(task)
          .catch((error) => {
            console.error(error.message);
          })
          .finally(() => {
            runningTasks--;
            taskRunner();
          });
      }

      if (!taskStarted) {
        break;
      }
    }
  } finally {
    isScheduling = false;
  }
};

module.exports = {
  taskRunner
};