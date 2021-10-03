"use strict";

const mapelController = require("../controllers/mapelController");
const mapelRouter = require("express").Router();

mapelRouter.get("/mapels", mapelController.getMapel);
mapelRouter.get("/mapels/:id", mapelController.getDetail)
mapelRouter.post("/mapels", mapelController.addMapel);
mapelRouter.patch("/mapels/:id", mapelController.patchMapel);
mapelRouter.delete("/mapels/:id", mapelController.deleteMapel);

module.exports = mapelRouter;