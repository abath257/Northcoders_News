const db = require("../db/index.js");


exports.fetchAllArticles = (sort_by = "created_at",order = 'desc',topic) => {
  const validListSort = ['article_id','title','topic','author','body','created_at','votes','comment_count']

const validTopics = ["cats","mitch"]

let queryStr= ("SELECT articles.*,CAST (COUNT(comments.article_id) AS INTEGER) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id GROUP BY articles.article_id")



if(topic){
if(validTopics.includes(topic)){
 queryStr = queryStr.slice(0, 155) + ` WHERE topic = '${topic}' GROUP BY articles.article_id`
} else {
  return Promise.reject({status:400, msg: 'Bad Request'})
}}
  

if(sort_by){
  if (validListSort.includes(sort_by)){
    if(order === 'asc') {
      queryStr += ` ORDER BY ${sort_by} ASC`
    }else if (order === 'desc'){
    queryStr += ` ORDER BY ${sort_by} DESC`
    }else if (order !== 'ASC' ||order !== 'DESC'){
    return Promise.reject({status:400, msg: 'Bad Request'})
    }}else
    {
    return Promise.reject({status:400, msg: 'Bad Request'})
  }
}

return db.query(queryStr)
    .then((data) => {
      const articles = data.rows;
      if (!articles) {
        return Promise.reject({ status: 404, msg: "Route Not Found" });
      }
      return articles;
    });
;}

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
