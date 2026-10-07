const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["running", "pending", "succeeded", "failed", "blocked", "cancelled"],
        default: "pending",
        required: true,
        index: true
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;