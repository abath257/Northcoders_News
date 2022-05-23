const fs = require('fs/promises')

exports.fetchAllEndpoints = () =>{
  console.log('here')
  fs.readFile("./endpoints.json","utf8").then((data)=>{
    console.log(data)
  })
}