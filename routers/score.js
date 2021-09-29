"use strict";

const scoreController = require("../controllers/scoreController");
const scoreRouter = require("express").Router();

scoreRouter.get("/scores", scoreController.getScore);
scoreRouter.post("/scores", scoreController.addScore);
scoreRouter.patch("/scores/:id", scoreController.patchScore);
scoreRouter.delete("/scores/:id", scoreController.deleteScore);

module.exports = scoreRouter;