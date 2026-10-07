const express = require("express");

const app = express();

app.use(express.json());

// let tasks = [];

// let taskName = "planning";
// let running = true;
// let pending = false;
// let succeeded = false;
// let failed = false;
// let blocked = false;
// let cancelled = false;


app.get("/status", (req, res) => {
  res.json({
    "task": taskName,
    "running": running,
    "pending": pending,
    "succeeded": succeeded,
    "failed": failed,
    "blocked": blocked,
    "cancelled": cancelled
  });
});

module.exports = app;