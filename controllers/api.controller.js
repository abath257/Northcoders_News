const {fetchAllEndpoints} = require("../models/api.model.js")

exports.getAllEndpoints = (req,res) =>{
  fetchAllEndpoints().then((data)=>{
    res.status(200).send({data})
  })
}