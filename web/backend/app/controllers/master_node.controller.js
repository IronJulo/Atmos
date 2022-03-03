const db = require("../models");
const Op = db.Sequelize.Op;

exports.get = (req, res) => {
    res.status(501).send({ message: "Master node ot implemented yet" });
    return;
};