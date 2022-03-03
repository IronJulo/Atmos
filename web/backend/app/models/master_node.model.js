module.exports = (sequelize, Sequelize) => {
    const MasterNode = sequelize.define("master_node", {
        name: {
            type: Sequelize.STRING
        },
        key: {
            type: Sequelize.STRING
        }
    });
    return MasterNode;
};