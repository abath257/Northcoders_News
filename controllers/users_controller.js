const{fetchAllUsers} = require("../models/users_model.js")

exports.getAllUsers = (req, res, next) =>{
  fetchAllUsers().then((users)=>{
    res.status(200).send({users})
  })
  .catch((err) => {
    next(err);
  });
}