const {db} = require("../models");
const Dashboard = db.dashboards;


exports.findOneById = async (dashboardId) => {
    return await Dashboard.findOne({ where: { id: dashboardId } });
};

exports.findAllByUser = async (user) => {
    return await Dashboard.findAll({ where: { userId: user.id } });
};

exports.create = async (dashboard) => {
    return await Dashboard.create(dashboard);
};