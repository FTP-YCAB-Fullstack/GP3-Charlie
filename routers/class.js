
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const ClassController = require("../controllers/classController")
const ClassRouter = require("express").Router()

ClassRouter.get("/class",authentication,authorization(["admin","teacher"]),ClassController.getAll)
ClassRouter.post("/class",ClassController.Create)

module.exports = ClassRouter;