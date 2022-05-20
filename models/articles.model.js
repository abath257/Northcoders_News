const db = require("../db/index.js");
const { convertTimestampToDate } = require("../db/helpers/utils.js");

exports.fetchAllArticles = () => {
  return db
    .query(
      "SELECT articles.*,CAST (COUNT(comments.article_id) AS INTEGER) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC"
    )
    .then((data) => {
      const articles = data.rows;
      if (!articles) {
        return Promise.reject({ status: 404, msg: "Route Not Found" });
      }
      return articles;
    });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      "SELECT articles.*,CAST (COUNT(comments.article_id) AS INTEGER) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id WHERE articles.article_id= $1 GROUP BY articles.article_id",
      [article_id]
    )
    .then((data) => {
      const article = data.rows[0];
      if (!article) {
        return Promise.reject({ status: 404, msg: "Route Not Found" });
      }
      return article;
    });
};

exports.patchArticleById = (article_id, votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [votes, article_id]
    )
    .then((data) => {
      let updatedArticle = data.rows[0];
      if (!updatedArticle) {
        return Promise.reject({ status: 404, msg: "Route Not Found" });
      }
      return updatedArticle;
    });
};
