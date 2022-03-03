const db = require("../models");
const User = db.users;

exports.post = (req, res) => {
    res.status(501).send({ message: "User ot implemented yet" });
    return;
};