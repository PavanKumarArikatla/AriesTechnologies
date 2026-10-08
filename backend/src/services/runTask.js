
const runTask = async (task) => {
  try {
    if (!task) throw new Error("Task not found");

    await new Promise((resolve) => {
      setTimeout(resolve, 10000);
    });

    const random = Math.random();
    console.log(random);
    const failed = random < 0.6;
    if (failed) {
        console.log(`${task.taskName} failed on attempt ${task.attempts}`);

        if (task.attempts <= task.retries) {
            task.status = "waiting";
            await task.save();
            return;
        }

        task.status = "failed";
        await task.save();

        return;
    }

    task.status = "succeeded";
    await task.save();
  } catch (error) {
    throw new Error(`Error running task: ${error.message}`);
  }
};

module.exports = { runTask };