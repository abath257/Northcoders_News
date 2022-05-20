const db = require("../db/index.js");

exports.fetchCommentsById = (article_id) => {
  return db
    .query(
      "SELECT comment_id,body,votes,author,created_at FROM comments WHERE article_id = $1 GROUP BY comment_id",
      [article_id]
    )
    .then((data) => {
      const comments = data.rows;
      if (!comments) {
        return Promise.reject({ status: 404, msg: "Route not Found" });
      }
      return comments;
    });
};
