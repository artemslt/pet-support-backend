require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const newsRouter = require("./routes/api/news");
const friendsRouter = require("./routes/api/friends");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/news", newsRouter);
app.use("/api/friends", friendsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;


