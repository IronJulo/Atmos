module.exports = app => {
    const master_node = require("../controllers/master_node.controller.js");
    var router = require("express").Router();

    router.get("/", master_node.get);
    app.use('/master_nodes', router);
}