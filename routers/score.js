"use strict";
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const scoreController = require("../controllers/scoreController");
const scoreRouter = require("express").Router();

scoreRouter.get("/scores",authentication,authorization(["admin","teacher"]), scoreController.getScore);
scoreRouter.get("/scores/:id",authentication,authorization(["admin","teacher"]), scoreController.getDetail)
scoreRouter.post("/scores",authentication,authorization(["admin"]), scoreController.addScore);
scoreRouter.patch("/scores/:id",authentication,authorization(["admin"]), scoreController.patchScore);
scoreRouter.delete("/scores/:id",authentication,authorization(["admin"]), scoreController.deleteScore);

module.exports = scoreRouter;