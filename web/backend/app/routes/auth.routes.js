module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();

    router.get("/", auth.get);
    app.use('/api/auth', router);
}