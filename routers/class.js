
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const ClassController = require("../controllers/classController")
const ClassRouter = require("express").Router()

ClassRouter.get("/class",authentication,authorization(["admin","teacher"]),ClassController.getAll)
ClassRouter.post("/class",authentication,authorization(["admin"]),ClassController.Create)
ClassRouter.delete("/class/:id",authentication,authorization(["admin"]),ClassController.Delete)
ClassRouter.put("/class/:id",authentication,authorization(["admin"]),ClassController.Update)

module.exports = ClassRouter;