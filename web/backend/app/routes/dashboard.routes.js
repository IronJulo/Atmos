module.exports = app => {
    const dashboardController = require("../controllers/dashboard.controller.js");
    const graphController = require("../controllers/graph.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();

    router.get("/", authService.autenticateToken, dashboardController.getUserDashboards);
    router.get("/:dashboardId", authService.autenticateToken, dashboardController.getDashboardById);
    router.get("/:dashboardId/graphs", authService.autenticateToken, graphController.getDashboardGraphs);
    router.post("/new", authService.autenticateToken, dashboardController.createDashboard);
    router.put("/:dashboardId/graphs-layouts", authService.autenticateToken, dashboardController.updateGraphsLayout);
    
    app.use('/dashboards', router);
}