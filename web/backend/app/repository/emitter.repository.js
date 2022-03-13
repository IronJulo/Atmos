const db = require("../models");
const Emitter = db.emitters;


exports.findOneById = async (emitterId) => {
    return await Emitter.findOne({ where: { id: emitterId } });
};

exports.findAllByUser = async (user) => {
    return await Emitter.findAll({ where: { userId: user.id } });
};

exports.create = async (emitter) => {
    return await Emitter.create(emitter);
};