module.exports = app => {
    const graphDataController = require("../controllers/graphData.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();
    // /graph-data& TODO
    router.get("/graph-data/:id", authService.autenticateToken, graphDataController.getData);
    app.use('/', router);
}