

const ClassController = require("../controllers/classController")
const ClassRouter = require("express").Router()

ClassRouter.get("/class",ClassController.getAll)
ClassRouter.post("/class",ClassController.Create)

module.exports = ClassRouter;