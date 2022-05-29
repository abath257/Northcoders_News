const db = require("../db/index.js");

exports.fetchCommentsById = ((article_id) => {
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
    })})

exports.postFreshComment = (article_id, comment) => {

  const { body } = comment;
  const { username } = comment;
  return db
    .query(
      "INSERT INTO comments (body,votes,author,article_id,created_at) VALUES ($1, 0, $2,$3, NOW()) RETURNING *",
      [comment.body,comment.username, article_id]
    )
    .then((data) => {
      const comment = data.rows[0]
      if (!comment) {
        return Promise.reject({ status: 404, msg: "Route not Found" });
      }
      return comment;
    });
}
  
  
exports.removeCommentById = ((comment_id)=>{
return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *',[comment_id])
.then((data)=>{
const comment = data.rows
if (comment.length === 0) {
  return Promise.reject({ status: 404, msg: "Route not Found" })
}
})})


