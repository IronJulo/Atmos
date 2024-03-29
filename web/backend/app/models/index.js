const dbConfig = require("../config/db.config.js");
const { Sequelize, Model, DataTypes } = require('sequelize');
const { InfluxDB } = require("influx");
const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {},
    logging: false,
});

const influxClient = new InfluxDB({
    database: dbConfig.INFLUX_DATA_BASE,
    host: dbConfig.HOST,
    port: dbConfig.INFLUX_PORT,
    username: dbConfig.INFLUX_USER,
    password: dbConfig.INFLUX_PASSWORD,
})


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.dashboards = require("./dashboard.model.js")(sequelize, Sequelize);
db.graphs = require("./graph.model.js")(sequelize, Sequelize);
db.emitters = require("./emitter.model.js")(sequelize, Sequelize);
db.collectors = require("./collector.model.js")(sequelize, Sequelize);
db.queries = require("./query.model.js")(sequelize, Sequelize);

db.users.hasMany(db.dashboards);
db.users.hasMany(db.emitters);

db.dashboards.hasMany(db.graphs);

db.emitters.hasMany(db.collectors); 

db.graphs.hasMany(db.queries);
 
module.exports = {
    db,
    influxClient
};