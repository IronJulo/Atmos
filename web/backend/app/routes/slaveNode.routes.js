module.exports = app => {
    const slaveNodeController = require("../controllers/slaveNode.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();

    router.get("/", authService.autenticateToken, slaveNodeController.get);
    app.use('/slave-nodes', router);
}