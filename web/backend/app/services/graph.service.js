const graphRepository = require("../repository/graph.repository");
const DashboardRepository = require("../repository/dashboard.repository");
const errorService = require("./error.service");

exports.findAllByDashboard = async (dashboard) => {
    const graphs = await graphRepository.findAllByDashboard(dashboard);
    if (!graphs) {
        throw new errorService.NotFoundError();
    }
    return graphs;
};
/**
 * Deprecated TODO
 */
exports.findOneById = async (graphId) => {
    const graphInDB = await graphRepository.findOneById(graphId);
    if (!graphInDB) {
        throw new errorService.NotFoundError();
    }
    return graphInDB;
};

exports.updateGraphsLayout = async (graph, graphId) => {
    const graphInDB = await graphRepository.update(graph, graphId);
    if (!graphInDB) {
        throw new errorService.UnableToCreateError();
    }
    return graphInDB;
};

exports.create = async (graph) => {
    const graphInDB = await graphRepository.create(graph);
    if (!graphInDB) {
        throw new errorService.UnableToCreateError();
    }
    return graphInDB;
};