const{fetchAllUsers} = require("../models/users_model")

exports.getAllUsers = (req,res) =>{
  fetchAllUsers()
}