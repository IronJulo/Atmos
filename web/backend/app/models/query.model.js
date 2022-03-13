module.exports = (sequelize, Sequelize) => {
    const Query = sequelize.define("query", {
        emitterId: {
            type: Sequelize.INTEGER
        },
        measurement: { // Name of the measurement (temperature, humidity, ...)
            type: Sequelize.STRING
        },
        unit: { // Unit of the measurement (°C, %, ...)
            type: Sequelize.STRING
        },
        type: { // type of the graph (line, bar, etc) redundant w/ graph.type
            type: Sequelize.STRING
        },
        alias: { // Name of the data sent back (helps with mixed data graph)
            type: Sequelize.STRING
        },
        grouping: { // Grouping points (1d / 1m / 1d / ...) if null -> req.body
            type: Sequelize.STRING
        }
    });
    return Query;
};