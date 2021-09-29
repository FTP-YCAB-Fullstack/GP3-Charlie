const userController = require("../controllers/userController")

const userRouter = require("express").Router()

userRouter.get("/users",userController.getAll)
userRouter.post("/users/register",userController.Register)
userRouter.post("/users/login",userController.Login)

module.exports = userRouter