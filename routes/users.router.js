const userRouter = require('express').Router()
const { getAllUsers } = require("../controllers/users.controller.js")
userRouter.get('/',getAllUsers)

module.exports = userRouter;