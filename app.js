// dependency imports
const express = require("express");
const app = express();
app.use(express.json());

// controller imports
const { getAllEndpoints } = require("./controllers/api.controller");

const { getTopics } = require("./controllers/topics.controller.js");
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
} = require("./controllers/articles.controller.js");

const {
  getCommentsById,
  deleteCommentById,
  postNewComment
} = require("./controllers/comments.controller.js");

const { getAllUsers } = require("./controllers/users.controller.js");

const {
  handleRootPathErrors,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./controllers/errors.controller.js");

//end of imports

//api handler
app.get("/api", getAllEndpoints);

//Host testing 
app.get("/hosting", (req,res,next)=>{
  res.send({msg:"api now hosted"})
})

//topics handler
app.get("/api/topics", getTopics);

//articles handler
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);


//comments handler
app.get("/api/articles/:article_id/comments", getCommentsById);
app.post("/api/articles/:article_id/comments", postNewComment);
app.delete("/api/comments/:comment_id", deleteCommentById);

//users handler
app.get("/api/users", getAllUsers);

//Errors handler
app.get("/api/*", handleRootPathErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);

//Export
module.exports = app;
