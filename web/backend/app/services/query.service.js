const queryRepository = require("../repository/query.repository");
const errorService = require("../services/error.service");

exports.findAllByGraph = async (graph) => { 
    const queries = await queryRepository.findAllByGraph(graph);
    if (!queries) {
        throw new errorService.NotFoundError();
    }
    return queries;
};

exports.findOneById = async (queryId) => { 
    const query = await queryRepository.findOneById(queryId);
    if (!query) {
        throw new errorService.NotFoundError();
    }
    return query;
};

exports.create = async (query) => {
    const queryInDB = await queryRepository.create(query);
    if (!queryInDB) {
        throw new errorService.UnableToCreateError();
    }
    return queryInDB;
};

exports.update = async (query, queryId) => {
    const queryInDB = await queryRepository.update(query, queryId);
    if (!queryInDB) {
        throw new errorService.UnableToUpdateError();
    }
    return queryInDB;
};