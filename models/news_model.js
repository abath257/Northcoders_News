
const db = require("../db/index.js");

exports.fetchTopics = (()=>{
  return db.query('SELECT * FROM topics;')
  .then((topics) =>{
    return topics.rows
  })
 })