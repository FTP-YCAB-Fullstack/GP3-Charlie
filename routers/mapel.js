"use strict";

const mapelController = require("../controllers/mapelController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const mapelRouter = require("express").Router();

mapelRouter.get("/mapels",authentication,authorization(["admin","teacher"]), mapelController.getMapel);
mapelRouter.get("/mapels/:id",authentication,authorization(["admin","teacher"]), mapelController.getDetail)
mapelRouter.post("/mapels",authentication,authorization(["admin"]), mapelController.addMapel);
mapelRouter.patch("/mapels/:id",authentication,authorization(["admin"]), mapelController.patchMapel);
mapelRouter.delete("/mapels/:id",authentication,authorization(["admin"]), mapelController.deleteMapel);

module.exports = mapelRouter;