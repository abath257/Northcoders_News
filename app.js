//imports
const express = require("express");
const app = express();
app.use(express.json());
const {
  handleRootPathErrors,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./controllers/errors.controller.js");
const {postNewComment} = require ('./controllers/comments.controller')



const { getTopics } = require("./controllers/topics.controller.js");
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
} = require("./controllers/articles.controller.js");
const { getAllUsers } = require("./controllers/users.controller.js");
const { getCommentsById , deleteCommentById } = require("./controllers/comments.controller.js");

//topics handler
app.get("/api/topics", getTopics);

//articles handler
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/users", getAllUsers);

//comments handler 
app.get("/api/articles/:article_id/comments", getCommentsById);

app.post('/api/articles/:article_id/comments', postNewComment)
app.delete("/api/comments/:comment_id",deleteCommentById)

//Errors handler 
app.get("/api/*", handleRootPathErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);

//Exports
module.exports = app;
