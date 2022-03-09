const db = require("../models");
const Emitter = db.emitters;


exports.findOneById = async (emitterId) => {
    return await Emitter.findOne({ where: { id: emitterId } })
};

exports.findAllOfUser = async (userId) => {
    return await Emitter.findAll({ where: { userId: userId } })
};

exports.create = async(emmiter) => {
    return await Emitter.create(emmiter);
};