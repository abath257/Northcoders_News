const express = require("express");
const app = express();
app.use(express.json());
const { getTopics, getArticles } = require("./controllers/news_controller.js");

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticles);

app.get("/api/*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, res, req, next) => {
  console.log(err.code);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  }
});

module.exports = app;
