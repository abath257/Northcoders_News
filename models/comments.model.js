const db = require("../db/index.js");
  
  
exports.removeCommentById = ((comment_id)=>{
return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *',[comment_id])
.then((data)=>{
const comment = data.rows
if (comment.length === 0) {
  return Promise.reject({ status: 404, msg: "Route not Found" })
}
})})


