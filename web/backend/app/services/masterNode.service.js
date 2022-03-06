const MasterNodeRepository = require("../repository/masterNode.repository");
const errorService = require("./error.service");

exports.findOneByIds = async (ownerId, masterNodeid) => {
    const masterNode = await MasterNodeRepository.findOneById(masterNodeid);

    if (!masterNode) {
        throw new errorService.NotFoundError();
    }
    if (masterNode.userId != ownerId) {
        throw new errorService.PermissionDeniedError();
    }
    return masterNode;
};

exports.findAllOfUser = (id) => {
    return MasterNodeRepository.findAllOfUser(id);
};

exports.create = async ({ key, name, userId }) => {
    try {
        await MasterNodeRepository.create({ key, name, userId });
    } catch (err) {
        //TODO
    }
};