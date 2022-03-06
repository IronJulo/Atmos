module.exports = app => {
    const authController = require("../controllers/auth.controller.js");
    const authService = require("../services/auth.service.js");
    var router = require("express").Router();

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.post("/refresh", authController.refreshToken);
    router.post("/logout", authController.logout);
    router.get("/user", authService.autenticateToken, authController.user);

    app.use('/auth', router);
}