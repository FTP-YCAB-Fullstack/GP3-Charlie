"use strict";

const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const scoreController = require("../controllers/scoreController");
const scoreRouter = require("express").Router();

scoreRouter.get("/scores", authentication,authorization(["admin"]),scoreController.getScore);
scoreRouter.get("/scores/:id", scoreController.getDetail)
scoreRouter.post("/scores",authentication,authorization(["teacher"]), scoreController.addScore);
scoreRouter.patch("/scores/:id", scoreController.patchScore);
scoreRouter.delete("/scores/:id", scoreController.deleteScore);

module.exports = scoreRouter;