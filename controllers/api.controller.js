const{fetchAllEndpoints} = require("../api.model.js")

exports.getAllEndpoints = (req,res) =>{
  fetchAllEndpoints()
}