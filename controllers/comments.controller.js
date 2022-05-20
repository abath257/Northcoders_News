const { fetchCommentsById } = require("../models/comments.model.js");
const { fetchArticleById } = require("../models/articles.model.js");

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
