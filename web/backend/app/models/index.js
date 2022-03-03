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
db.dashboards = require("./dashboard.model.js")(sequelize, Sequelize);
db.graphs = require("./graph.model.js")(sequelize, Sequelize);
db.master_nodes = require("./master_node.model.js")(sequelize, Sequelize);
db.slave_nodes = require("./slave_node.model.js")(sequelize, Sequelize);

db.users.hasMany(db.dashboards);
db.users.hasMany(db.master_nodes);

db.dashboards.hasMany(db.graphs);
db.dashboards.hasMany(db.graphs);

db.master_nodes.hasMany(db.slave_nodes);

module.exports = db;