const userController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const userRouter = require("express").Router()

userRouter.get("/users",authentication,authorization(["admin","teacher"]),userController.getAll)
userRouter.post("/users/register",userController.Register)
userRouter.post("/users/login",userController.Login)

module.exports = userRouter