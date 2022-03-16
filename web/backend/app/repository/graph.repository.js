const db = require("../models");
const Graphs = db.graphs;


exports.findAllByDashboard = async (dashboard) => {
    return await Graphs.findAll({ where: { dashboardId: dashboard.id } });
};

exports.findOneById = async (graphId) => {
    return await Graphs.findOne({ where: { id: graphId } });
};

exports.create = async (graph) => {
    return await Graphs.create(graph);
};

exports.update = async (graph, graphId) => {
    return await Graphs.update(graph, { where: { id: graphId } });
};