const express = require("express");
const app = express();
app.use(express.json());
const { getTopics, getArticles } = require("./controllers/news_controller.js");

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticles);

app.get("/api/*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    console.log(err.status);
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code == "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  }
});

module.exports = app;
