module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();

    router.post("/login", auth.login);
    router.get("/refresh", auth.refreshToken);
    app.use('/api/auth', router);
}