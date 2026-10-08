const express = require("express");
const app = express();
const allRoutes = require("./routes/allTasks");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api", allRoutes);

module.exports = app;