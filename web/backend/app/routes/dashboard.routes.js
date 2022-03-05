
module.exports = app => {
    const dashboard = require("../controllers/dashboard.controller.js");
    const auth = require("../controllers/auth.controller");

    var router = require("express").Router();

    router.get("/", auth.autenticateToken, dashboard.get);
    app.use('/dashboards', router);
}