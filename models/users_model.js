const db = require("../db/index.js");

exports.fetchAllUsers = ()=>{
return db.query('SELECT username FROM users').then((data)=>{
let usersArr = data.rows
return usersArr
})
}