module.exports = app => {
    const graphDataController = require("../controllers/data.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();
    
    router.post("/", /* todo token */ graphDataController.saveData);
    app.use('/data', router);
}