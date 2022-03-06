const masterNodeService = require("../services/masterNode.service");
const errorService = require("../services/error.service");

exports.getUserMasterNodes = async (req, res, next) => {
    try {
        console.log("User requested his master nodes");
        const masterNodes = await masterNodeService.findAllOfUser(req.user.id)

        let masterNodesList = [];
        masterNodes.map(node => (
            masterNodesList.push({ id: node.id, name: node.name, key: node.key })
        ));

        res.status(200).json(masterNodesList);

    } catch (err) {
        next(err);
    }
};

exports.getMasterNodeById = async (req, res, next) => {
    try {
        console.log("User requested 1 master node data");
        const masterNode = await masterNodeService.findOneByIds(req.user.id, req.params.masterNodeId)
        console.log(masterNode);

        res.status(200).json({
            name: masterNode.name,
            key: masterNode.key
        });

    } catch (err) {
        next(err);
    }
};

exports.createMasterNode = (req, res, next) => {
    try {
        console.log("User requested to create a new master node");
        const { key, name } = req.body;
        const masterNode = masterNodeService.create({ key, name, userId: req.user.id })
        if (!masterNode) {
            throw new errorService.UnableToCreateError();
        }
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};