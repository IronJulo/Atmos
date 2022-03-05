module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/", user.post)
    app.use('/users', router);
}