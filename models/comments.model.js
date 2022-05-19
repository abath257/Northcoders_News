const db = require("../db/index.js");

exports.fetchCommentsById = (article_id)=>{
return db.query('SELECT comment_id,body,author,votes,created_at FROM comments WHERE article_id = $1',[article_id])
.then((data)=>{
const comments = data.rows
return comments
})}
