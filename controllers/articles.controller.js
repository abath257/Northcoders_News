const {
  fetchArticleById,
  patchArticleById,
  fetchAllArticles,
  fetchCommentsById,
  postFreshComment
 
} = require("../models/articles.model.js");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  fetchAllArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

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
      res.status(201).send({ comment: response });
    })
    .catch((err) => {
      next(err);
    });
};