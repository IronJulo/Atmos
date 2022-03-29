module.exports = app => {
    const collectorController = require("../controllers/collector.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();   

    router.get("/", authService.autenticateToken, collectorController.get);
    app.use('/collectors', router);
}