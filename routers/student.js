"use strict";

const studentController = require("../controllers/studentController");
const studentRouter = require("express").Router();

studentRouter.get("/students", studentController.getAll);
studentRouter.get("/students/:id", studentController.getById);
studentRouter.post("/students", studentController.submitNewData);
studentRouter.patch("/students/:id", studentController.update);
studentRouter.delete("/students/:id", studentController.revoke);

module.exports = studentRouter;