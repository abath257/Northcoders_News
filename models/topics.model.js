const db = require("../db/index.js");


exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then((data) => {
    const topics = data.rows;
    
    return topics;
  });
};


