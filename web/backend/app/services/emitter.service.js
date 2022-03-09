const EmitterRepository = require("../repository/emitter.repository");
const errorService = require("./error.service");

exports.findOneByIds = async (ownerId, emitterid) => {
    const emitter = await EmitterRepository.findOneById(emitterid);

    if (!emitter) {
        throw new errorService.NotFoundError();
    }
    if (emitter.userId != ownerId) {
        throw new errorService.PermissionDeniedError();
    }
    return emitter;
};

exports.findAllOfUser = (userId) => {
    return EmitterRepository.findAllOfUser(userId); //TODO async
};

exports.create = async (emmiter) => {
    return await EmitterRepository.create(emmiter);
};