module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();

    router.post("/login", auth.login);
    router.post("/register", auth.register);
    router.post("/refresh", auth.refreshToken);
    router.post("/logout", auth.logout);
    router.get("/user", auth.autenticateToken, auth.user);

    app.use('/auth', router);
}