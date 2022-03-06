const dashboardService = require("../services/dashboard.service");
const errorService = require("../services/error.service");

exports.getUserDashboards = async (req, res, next) => {
    try {
        console.log("User requested his dashboards");
        const dashboards = await dashboardService.findAllOfUser(req.user.id)

        let dashboardsList = [];
        dashboards.map(dashboard => (
            dashboardsList.push({
                id: dashboard.id,
                name: dashboard.name,
            })
        ));

        res.status(200).json(dashboardsList);

    } catch (err) {
        next(err);
    }
};

exports.getDashboardById = async (req, res, next) => {
    try {
        console.log("User requested 1 dashboard");
        const dashboard = await dashboardService.findOneByIds(req.user.id, req.params.dashboardId)

        res.status(200).json({
            id: dashboard.id,
            name: dashboard.name
        });

    } catch (err) {
        next(err);
    }
};

exports.createDashboard = (req, res, next) => {
    try {
        console.log("User requested to create a new dashboard");
        const { name } = req.body;
        const dashboard = dashboardService.create({ name, userId: req.user.id })
        if (!dashboard) {
            throw new errorService.UnableToCreateError();
        }
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};