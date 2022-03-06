const db = require("../models");
const MasterNode = db.masterNodes;


exports.findOneById = (masterNodeId) => {
    return MasterNode.findOne({
        where: {
            id: masterNodeId
        }
    })
};

exports.findAllOfUser = (userId) => {
    return MasterNode.findAll({ where: { userId: userId } })
};

exports.create = (masterNode) => {
    return MasterNode.create(masterNode);
};