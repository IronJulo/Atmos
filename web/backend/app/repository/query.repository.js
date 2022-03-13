const db = require("../models");
const Querys = db.queries;


exports.findAllByGraph = async (graph) => {
    return await Querys.findAll({ where: { graphId: graph.id } });
};
exports.findOneById = async (queryId) => {
    return await Querys.findOne({ where: { id: queryId } });
};

exports.create = async (query) => {
    return await Querys.create(query);
};

exports.update = async (query, queryId) => {
    return await Querys.update(
        query,
        { where: { id: queryId } }
    );
};
