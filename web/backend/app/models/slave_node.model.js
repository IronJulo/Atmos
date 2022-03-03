module.exports = (sequelize, Sequelize) => {
    const SlaveNode = sequelize.define("slave_node", {
        x: {
            type: Sequelize.INTEGER
        },
        y: {
            type: Sequelize.INTEGER
        },
        key: {
            type: Sequelize.STRING
        }
    });
    return SlaveNode;
};