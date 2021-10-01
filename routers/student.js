"use strict";

const studentController = require("../controllers/studentController");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const studentRouter = require("express").Router();

studentRouter.get("/students",authentication,authorization(["admin","teacher"]), studentController.getAll);
studentRouter.get("/students/:id", studentController.getById);
studentRouter.post("/students",authentication,authorization(["admin"]), studentController.submitNewData);
studentRouter.patch("/students/:id", studentController.update);
studentRouter.delete("/students/:id", studentController.revoke);

module.exports = studentRouter;