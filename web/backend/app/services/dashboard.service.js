const DashboardRepository = require("../repository/dashboard.repository");
const errorService = require("./error.service");

exports.findOneByIds = async (ownerId, dashboardId) => {
    const dashboard = await DashboardRepository.findOneById(dashboardId);

    console.log("dashboard");
    console.log(dashboard);

    if (!dashboard) {
        throw new errorService.NotFoundError();
    }
    if (dashboard.userId != ownerId) {
        throw new errorService.PermissionDeniedError();
    }
    return dashboard;
};

exports.findAllOfUser = (id) => {
    return DashboardRepository.findAllOfUser(id);
};

exports.create = async ({ name, userId }) => {
    await DashboardRepository.create({ name, userId });
};