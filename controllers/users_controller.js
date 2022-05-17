const{fetchAllUsers} = require("../models/Users_model")

exports.getAllUsers = (req,res) =>{
  fetchAllUsers()
}