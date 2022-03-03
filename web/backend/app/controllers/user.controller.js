const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.get = (req, res) => {
    res.status(501).send({ message: "User ot implemented yet" });
    return;
};