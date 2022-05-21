const {
  fetchCommentsById,
  removeCommentById,
} = require("../models/comments.model.js");
const { fetchArticleById } = require("../models/articles.model.js");
const { postFreshComment } = require("../models/comments.model.js");

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [fetchCommentsById(article_id)];
  if (article_id) {
    promises.push(fetchArticleById(article_id));
  }
  Promise.all(promises)
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  postFreshComment(article_id, newComment)
    .then((response) => {
      res.status(201).send( {comment:response} );

    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send({});