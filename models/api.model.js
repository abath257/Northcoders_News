const {fs}= require('fs.promises')

exports.FetchAll = () =>{
  fs.readfile('../endpoints.json',utf8).then((data)=>{
    console.log(data)
  })
}