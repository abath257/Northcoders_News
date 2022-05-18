const db = require("../db/index.js");
const { convertTimestampToDate } = require("../db/helpers/utils.js");

exports.fetchArticleById = (article_id) => {
  return db
    .query("ALTER TABLE articles ADD comment_count INT")
    .then(() => {
      return db.query("SELECT article_id FROM comments");
    })
    .then((ids) => {
      const commentCount = ids.rows.filter((id) => {
        return id.article_id === Number(article_id);
      }).length;
      return db.query(
        "UPDATE articles SET comment_count = $1 WHERE article_id = $2 RETURNING *",
        [commentCount, article_id]
      );
    })
    .then((data) => {
      const article = data.rows[0];
      if (!article) {
        return Promise.reject({ status: 404, msg: "Route Not Found" });
      }
      const formattedDateArticle = convertTimestampToDate(article);
      return formattedDateArticle;
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
