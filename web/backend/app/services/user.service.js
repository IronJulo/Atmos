const userRepository = require("../repository/user.repository");
const errorService = require("../services/error.service");

exports.findOneByEmail = async (email) => {
    const user = await userRepository.findOneByEmail(email);
    if (!user) {
        throw new errorService.InvalidEmailOrPasswordError();
    }
    return user;
};

exports.create = async (user) => { // no test -> done in auth
    return await userRepository.create(user);
};