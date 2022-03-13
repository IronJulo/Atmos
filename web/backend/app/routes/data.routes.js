module.exports = app => {
    const graphDataController = require("../controllers/data.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();
    
    /**
    * Deprecated 
    */
    router.get("/data/", authService.autenticateToken, graphDataController.getData);
    app.use('/', router);
}