const dashboardService = require("../services/dashboard.service");
const errorService = require("../services/error.service");

exports.getUserDashboards = async (req, res, next) => {
    try {
        console.log("User requested his dashboards!");
        const dashboards = await dashboardService.findAllByUser(req.user);
        let dashboardsList = [];
        dashboards.map(dashboard => (
            dashboardsList.push({
                id: dashboard.id,
                name: dashboard.name,
            })
        ));
        return res.status(200).json(dashboardsList);
    } catch (err) {
        next(err);
    }
};

exports.getDashboardById = async (req, res, next) => {
    try {
        console.log("User requested 1 dashboard!");
        const dashboard = await dashboardService.findOneById(req.params.dashboardId);
        if (dashboard.userId != req.user.id) {
            throw new errorService.PermissionDeniedError();
        }
        res.status(200).json({
            id: dashboard.id,
            name: dashboard.name
        });
    } catch (err) {
        next(err);
    }
};

exports.createDashboard = async (req, res, next) => {
    try {
        console.log("User requested to create a new dashboard!");
        const { name } = req.body; // TODO celebrate
        await dashboardService.create({ name, userId: req.user.id })
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

exports.updateGraphsLayout = async (req, res, next) => {
    try {
        console.log("User updated dashboard layout!");
        const dashboard = await dashboardService.findOneById(req.params.dashboardId);
        if (dashboard.userId != req.user.id) {
            throw new errorService.PermissionDeniedError();
        }

        const changes = req.body.changes;

        console.log(changes);
        
        
        
        res.sendStatus(501);
    } catch (err) {
        next(err);
    }
};