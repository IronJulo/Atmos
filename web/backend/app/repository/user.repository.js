const db = require("../models");
const User = db.users;
 

exports.findOneByEmail = (email) => {
    return User.findOne({ where: { email: email } }) // TODO -email
};

exports.create = (user) => {
    return User.create(user);
};