const express = require("express");
const app = express();
app.use(express.json());
const { getTopics } = require("./controllers/topics_controller.js");
const { getArticles } = require("./controllers/articles_controller.js");

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticles);
const {
  getArticleById,
  patchArticleById,
} = require("./controllers/articles_controller.js");
const {getAllUsers} = require("./controllers/users_controller.js")

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/users",getAllUsers)

const {
  getArticleById,
  patchArticleById,
} = require("./controllers/articles_controller.js");

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);


app.get("/api/*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "23502") {
    res.status(422).send({ msg: "Incorrect Input" });
  }
});

module.exports = app;
