module.exports = (sequelize, Sequelize) => {
    const Collector = sequelize.define("collector", {
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
    return Collector;
};