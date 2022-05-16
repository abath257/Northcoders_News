const express = require("express");
const app = express();
app.use(express.json());
const { getTopics } = require("./controllers/news_controller.js");

app.get("/api/topics", getTopics);

app.get("/api/*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

module.exports = app;
