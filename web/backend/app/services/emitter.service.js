const EmitterRepository = require("../repository/emitter.repository");
const errorService = require("./error.service");

exports.findAllByUser = async (user) => {
    const emitters = await EmitterRepository.findAllByUser(user);
    if (!emitters) {
        throw new errorService.NotFoundError();
    }
    return emitters;
};

exports.findOneById = async (emitterId) => {
    const emitter = await EmitterRepository.findOneById(emitterId);
    if (!emitter) {
        throw new errorService.NotFoundError();
    }
    return emitter; 
};

exports.create = async (emitter) => {
    const emitterInDB = await EmitterRepository.create(emitter);
    if (!emitterInDB) {
        throw new errorService.NotFoundError();
    }
    return emitterInDB;
};