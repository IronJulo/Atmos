module.exports = (sequelize, Sequelize) => {
    const Graph = sequelize.define("graph", {
        order: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        },
        unit: {
            type: Sequelize.STRING
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