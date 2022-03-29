const dashboardRepository = require("../repository/dashboard.repository");
const errorService = require("./error.service");

exports.findAllByUser = async (user) => {
    const dashboards =  await dashboardRepository.findAllByUser(user);
    if (!dashboards) {
        throw new errorService.NotFoundError();
    }
    return dashboards;
};

exports.findOneById = async (dashboardId) => {
    const dashboard = await dashboardRepository.findOneById(dashboardId);
    if (!dashboard) {
        throw new errorService.NotFoundError();
    }
    return dashboard;
};

exports.create = async (dashboard) => {
    const dashboardInDB = await dashboardRepository.create(dashboard);
    if (!dashboardInDB) {
        throw new errorService.UnableToCreateError();
    }
    return dashboardInDB;
};