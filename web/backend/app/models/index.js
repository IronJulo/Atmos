const dbConfig = require("../config/db.config.js");
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {},
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);
module.exports = db;