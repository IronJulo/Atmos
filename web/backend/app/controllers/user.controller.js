const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    res.status(501).send({ message: "Not implemented yet" });
    return;
};