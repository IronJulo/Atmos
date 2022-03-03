const db = require("../models");

exports.get = (req, res) => {
    res.status(200).send({ message: "you are logged in" });
    return;
};