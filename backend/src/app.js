const express = require("express");
const app = express();
const allTasksRouter = require("./routes/allTasks");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api", allTasksRouter);

module.exports = app;