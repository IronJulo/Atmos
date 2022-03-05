const userRepository = require("../repository/user.repository")

exports.findOneByEmail = (email) => {
    return userRepository.findOneByEmail(email)
};

exports.create = (user) => {
    return userRepository.create(user);
};