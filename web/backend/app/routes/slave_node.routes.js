module.exports = app => {
    const slave_node = require("../controllers/slave_node.controller.js");
    var router = require("express").Router();

    router.get("/", slave_node.get);
    app.use('/api/slave_nodes', router);
}