/*const queryService = require("../services/query.service");
const graphService = require("../services/graph.service");
const errorService = require("../services/error.service");

exports.getGraphQueries = async (req, res, next) => {
    try {
        console.log("User graph's queries!");
        const graph = await graphService.findOneById(graph.id);

        const dashboard = await dashboardService.findOneById(graph.dashboardId);

        if (dashboard.userId != req.user.id) {
            throw new errorService.PermissionDeniedError();
        }
    } catch (err) {
        next(err);
    }
};

exports.updateGraphQueries = async (req, res, next) => {
    res.status(501).json({ message: "not implemented yet" });
};

exports.getGraphData = async (req, res, next) => {
    res.status(501).json({ message: "not implemented yet" });
};

exports.getGraphData2 = async (req, res, next) => {
    res.status(501).json({ message: "not implemented yet" });
};*/
