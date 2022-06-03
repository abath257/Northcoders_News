const articlesRouter = require('express').Router()
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postNewComment,
  getCommentsById,
} = require("../controllers/articles.controller.js");

articlesRouter
.route('/')
.get(getAllArticles)

articlesRouter
.route('/:article_id')
.get(getArticleById)
.patch(patchArticleById)

articlesRouter
.route('/:article_id/comments')
.get(getCommentsById)
.post(postNewComment)









module.exports = articlesRouter
