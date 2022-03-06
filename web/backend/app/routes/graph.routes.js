module.exports = app => {
    const graphController = require("../controllers/graph.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();

    router.get("/graphs/:dashbaoardId", authService.autenticateToken, graphController.getDashboardGraphs);
    //router.get("/graph/:graphId", authService.autenticateToken, graphController.getGraph);
    app.use('/', router);
}