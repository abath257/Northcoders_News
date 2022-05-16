const db = require("../db/index.js");
const {convertTimestampToDate} = require('../db/helpers/utils.js')

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;")
  .then((data) => {
    const topics = data.rows;
    return topics;
  });
};

exports.fetchArticles = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
    
const formattedDateArticle = convertTimestampToDate(data.rows[0])
return formattedDateArticle     
});
};
