const userController = require("../controllers/userController")
const user = require("../models/user")
const userRouter = require("express").Router()

userRouter.get("/users",userController.getAll)
userRouter.post("/users/register",userController.Register)

module.exports = userRouter