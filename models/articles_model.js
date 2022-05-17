const db = require("../db/index.js");
const { convertTimestampToDate } = require("../db/helpers/utils.js");

exports.fetchArticles = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
      const article = data.rows[0];
      if (!article) {
        return Promise.reject({ status: 404, msg: "Route Not Found" });
      }
      const formattedDateArticle = convertTimestampToDate(article);
      return formattedDateArticle;
    });
};
