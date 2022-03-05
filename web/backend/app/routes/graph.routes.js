module.exports = app => {
    const graph = require("../controllers/graph.controller.js");
    var router = require("express").Router();

    router.get("/", graph.get);
    app.use('/graphs', router);
}