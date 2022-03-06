module.exports = (sequelize, Sequelize) => {
    const MasterNode = sequelize.define("masterNode", {
        name: {
            type: Sequelize.STRING
        },
        key: {
            type: Sequelize.STRING
        }
    });
    return MasterNode;
};