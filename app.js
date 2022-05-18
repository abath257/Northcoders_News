const express = require("express");
const app = express();
app.use(express.json());
const {handleRootPathErrors, handleCustomErrors,handlePSQLErrors} = require('./controllers/errors.controller.js')

const { getTopics } = require("./controllers/topics.controller.js");
const {getArticleById, patchArticleById} = require("./controllers/articles.controller.js");
const {getAllUsers} = require("./controllers/users.controller.js")



app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/users",getAllUsers)


app.get("/api/*", handleRootPathErrors)

app.use(handleCustomErrors)

app.use(handlePSQLErrors)

module.exports = app;
