module.exports = app => {
    const emitterController = require("../controllers/emitter.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();

    router.get("/", authService.autenticateToken, emitterController.getUserEmitters);
    router.post("/new", authService.autenticateToken, emitterController.createEmitter);
    router.get("/:emitterId", authService.autenticateToken, emitterController.getEmitterById);
    app.use('/emitters', router);
}