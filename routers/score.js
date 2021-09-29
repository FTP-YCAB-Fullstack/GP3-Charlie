"use strict";

const scoreController = require("../controllers/scoreController");
const scoreRouter = require("express").Router();

scoreRouter.get("/scores", scoreController.getScore);
scoreRouter.post("/scores", scoreController.addScore);
module.exports = scoreRouter;