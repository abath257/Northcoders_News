const { fetchTopics } = require("../models/news_model.js");

exports.getTopics = (req, res) => {
  fetchTopics()
    .then((topics) => {
      console.log(topics);
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
