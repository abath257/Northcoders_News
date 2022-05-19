const { fetchCommentsById } = require("../models/comments.model.js")


exports.getCommentsById = (req,res)=>{
const {article_id} = req.params
fetchCommentsById(article_id)
}