
const db = require("../db/index.js");

exports.fetchTopics = (()=>{
  return db.query('SELECT * FROM topics;')
  .then((data) =>{
   return data.rows
  })
 })