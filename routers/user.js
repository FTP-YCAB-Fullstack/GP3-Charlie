const userController = require("../controllers/userController")
const userRouter = require("express").Router()

userRouter.get("/users",userController.getAll)

module.exports = userRouter