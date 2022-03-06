module.exports = app => {
    const dashboardController = require("../controllers/dashboard.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();

    router.get("/", authService.autenticateToken, dashboardController.getUserDashboards);
    router.post("/new", authService.autenticateToken, dashboardController.createDashboard);
    router.get("/:dashboardId", authService.autenticateToken, dashboardController.getDashboardById);
    
    app.use('/dashboards', router);
}