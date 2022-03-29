const {db} = require("../models");
const Queries = db.queries;


exports.findAllByGraph = async (graph) => {
    return await Queries.findAll({ where: { graphId: graph.id } });
};
exports.findOneById = async (queryId) => {
    return await Queries.findOne({ where: { id: queryId } });
};

exports.create = async (query) => {
    return await Queries.create(query);
};

exports.update = async (query, queryId) => {
    return await Queries.update(
        query,
        { where: { id: queryId } }
    );
};

exports.delete = async (query) => {
    console.log("delete")
    await Queries.destroy(
        { where: { id: query.id } }
    );
};