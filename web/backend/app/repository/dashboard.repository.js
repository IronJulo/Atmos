const db = require("../models");
const Dashboard = db.dashboards;


exports.findOneById = (dashboardId) => {
    return Dashboard.findOne({
        where: {
            id: dashboardId
        }
    })
};

exports.findAllOfUser = (userId) => {
    return Dashboard.findAll({ where: { userId: userId } })
};

exports.create = (dashboard) => {
    return Dashboard.create(dashboard);
};