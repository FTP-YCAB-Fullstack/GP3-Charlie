"use strict";

const scoreController = require("../controllers/scoreController");
const scoreRouter = require("express").Router();

scoreRouter.get("/scores", scoreController.getScore);
scoreRouter.get("/scores/:id", scoreController.getDetail)
// scoreRouter.post("/scores/:studentId/:MapelId", scoreController.addScore);
scoreRouter.patch("/scores/:id", scoreController.patchScore);
scoreRouter.delete("/scores/:id", scoreController.deleteScore);

module.exports = scoreRouter;