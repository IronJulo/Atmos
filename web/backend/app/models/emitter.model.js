module.exports = (sequelize, Sequelize) => {
    const Emitter = sequelize.define("emitter", {
        name: {
            type: Sequelize.STRING
        },
        key: {
            type: Sequelize.STRING
        }
    });
    return Emitter;
};