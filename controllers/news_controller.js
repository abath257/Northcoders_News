const { fetchTopics,fetchArticles } = require("../models/news_model.js");


exports.getTopics = (req, res) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req,res,next)=>{
 const {article_id} = req.params
fetchArticles(article_id)
.then((article)=>{
res.status(200).send({article})
})
.catch((err) => {
  next(err)
  })
}