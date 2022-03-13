module.exports = (sequelize, Sequelize) => {
    const Graph = sequelize.define("graph", {
        label: {
            type: Sequelize.STRING
        },
        type: { // TODO remove 
            type: Sequelize.STRING
        },
        layoutX: {
            type: Sequelize.INTEGER
        },
        layoutY: {
            type: Sequelize.INTEGER
        },
        width: {
            type: Sequelize.INTEGER
        },
        height: {
            type: Sequelize.INTEGER
        },
    });
    return Graph;
};