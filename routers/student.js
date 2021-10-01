"use strict";

const studentController = require("../controllers/studentController");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const studentRouter = require("express").Router();

studentRouter.get("/students",authentication,authorization(["admin","teacher"]), studentController.getAll);
studentRouter.get("/students/:id",authentication,authorization(["admin","teacher"]), studentController.getById);
studentRouter.post("/students",authentication,authorization(["admin"]), studentController.submitNewData);
studentRouter.patch("/students/:id",authentication,authorization(["admin"]), studentController.update);
studentRouter.delete("/students/:id",authentication,authorization(["admin"]), studentController.revoke);

module.exports = studentRouter;