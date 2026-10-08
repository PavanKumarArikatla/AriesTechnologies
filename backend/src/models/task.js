const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["waiting", "running", "succeeded", "failed", "blocked", "cancelled"],
      default: "waiting",
      required: true,
      index: true
    },
    dependencies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }],
    attempts: {
      type: Number,
      default: 0
    },
    retries: {
      type: Number,
      default: 3
    }
  },
  { 
    timestamps: true // Wrap this configuration option in curly braces
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;