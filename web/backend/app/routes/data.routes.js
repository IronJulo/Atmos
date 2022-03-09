module.exports = app => {
    const graphDataController = require("../controllers/data.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();
    
    /**
    * Get graphs ho a specific dashboard 
    */
    router.get("/data/", authService.autenticateToken, graphDataController.getData);
    app.use('/', router);
}