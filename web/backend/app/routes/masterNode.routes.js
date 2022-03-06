module.exports = app => {
    const masterNodeController = require("../controllers/masterNode.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();

    router.get("/", authService.autenticateToken, masterNodeController.getUserMasterNodes);
    router.post("/new", authService.autenticateToken, masterNodeController.createMasterNode);
    router.get("/:masterNodeId", authService.autenticateToken, masterNodeController.getMasterNodeById);
    app.use('/master-nodes', router);
}