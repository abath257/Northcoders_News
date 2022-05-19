const {
  fetchArticleById,
  patchArticleById, fetchAllArticles
} = require("../models/articles.model.js");

exports.getAllArticles = (req,res,next) =>{
fetchAllArticles()
  .then((articles) => {
    res.status(200).send({articles});
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
