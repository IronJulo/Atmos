const dataController = require("./data.controller");

const dashboardService = require("../services/dashboard.service");
const graphService = require("../services/graph.service");
const queryService = require("../services/query.service");
const emitterService = require("../services/emitter.service");
const errorService = require("../services/error.service");


exports.getDashboardGraphs = async (req, res, next) => {
    try {

        console.log(`User requested dashboard${req.params.dashboardId}'s graphs`);
        const dashboard = await dashboardService.findOneById(req.params.dashboardId)
        if (dashboard.userId != req.user.id) {
            throw new errorService.PermissionDeniedError();
        }
        const graphs = await graphService.findAllByDashboard(dashboard);
        let graphList = [];
        graphs.map(graph => (
            graphList.push({
                i: graph.id,
                label: graph.label,
                type: graph.type,
                w: graph.width,
                h: graph.height,
                x: graph.layoutX,
                y: graph.layoutY,
            })
        ));
        res.status(200).json(graphList);
    } catch (err) {
        next(err);
    }
};

exports.getGraph = async (req, res, next) => {
    try {
        console.log(`User requested graph id: ${req.params.graphId}`);
        const graph = await graphService.findOneById(req.params.graphId); //TODO celebrate
        const dashboard = await dashboardService.findOneById(graph.dashboardId);
        if (dashboard.userId != req.user.id) {
            throw new errorService.PermissionDeniedError();
        }

        res.status(200).json({
            i: graph.id,
            label: graph.label,
            type: graph.type,
            w: graph.width,
            h: graph.height,
            x: graph.layoutX,
            y: graph.layoutY,
        });
    } catch (err) {
        next(err);
    }
};

exports.getGraphQueries = async (req, res, next) => {
    try {
        console.log(`User requested graph id: ${req.params.graphId} queries`);
        const graph = await graphService.findOneById(req.params.graphId); //TODO celebrate
        const dashboard = await dashboardService.findOneById(graph.dashboardId);
        if (dashboard.userId != req.user.id) {
            throw new errorService.PermissionDeniedError();
        }

        const queries = await queryService.findAllByGraph(graph);
        let queryList = [];
        queries.map(query => (
            queryList.push({
                id: query.id,
                emitterId: query.emitterId,
                measurement: query.measurement,
                unit: query.unit,
                type: query.type,
                alias: query.alias,
                grouping: query.grouping,
            })
        ));
        res.status(200).json(queryList);
    } catch (err) {
        next(err);
    }
};

exports.getGraphData = async (req, res, next) => {
    try {
        console.log(`User requested graph id: ${req.params.graphId} data`);
        const graph = await graphService.findOneById(req.params.graphId);

        const dashboard = await dashboardService.findOneById(graph.dashboardId);
        if (dashboard.userId = !req.user.id) {
            throw new errorService.PermissionDeniedError();
        }

        const queries = await queryService.findAllByGraph(graph);


        let result = { series: [] };

        for (query in queries) {
            result.series.push({
                id: queries[query].id,
                name: queries[query].alias,
                type: queries[query].type,
                unit: queries[query].unit,
                data: await dataController.executeQuery(queries[query])
            })
        }
        console.log(result)

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.getGraphData2 = async (req, res, next) => {
    res.status(501).send({ message: "not implemented yet" });
    return;
};


exports.updateGraphQueries = async (req, res, next) => {
    try {
        console.log("user requested the edit of a graph query!")
        const { emitterId, measurement, unit, type, alias, grouping } = req.body; // TODO celebrate

        const query = await queryService.findOneById(req.params.queryId);
        const graph = await graphService.findOneById(query.graphId);
        const dashboard = await dashboardService.findOneById(graph.dashboardId);

        if (dashboard.userId = !req.user.id) {
            throw new errorService.PermissionDeniedError();
        }

        await queryService.update({ emitterId, measurement, unit, type, alias, grouping }, req.params.queryId);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

exports.createGraphQuery = async (req, res, next) => {
    try {
        console.log("user requested the creation of a graph query!")

        const { graphId } = req.params; // TODO celebrate

        const graph = await graphService.findOneById(graphId);
        const dashboard = await dashboardService.findOneById(graph.dashboardId);

        if (dashboard.userId = !req.user.id) {
            throw new errorService.PermissionDeniedError();
        }

        const query = await queryService.create({ alias: "Query", graphId });
        res.status(200).json({
            id: query.id,
            emitterId: query.emitterId,
            measurement: query.measurement,
            unit: query.unit,
            type: query.type,
            alias: query.alias,
            grouping: query.grouping,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteGraphQuery = async (req, res, next) => {
    try {
        console.log("User requested the deletion of a graph query!")

        const { queryId } = req.params; // TODO celebrate

        const query = await queryService.findOneById(queryId);
        const graph = await graphService.findOneById(query.graphId);
        const dashboard = await dashboardService.findOneById(graph.dashboardId);

        if (dashboard.userId = !req.user.id) {
            throw new errorService.PermissionDeniedError();
        }

        await queryService.delete(query);
        res.sendStatus(200)
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        console.log("user requested the creation of a graph!");

        const { dashboardId } = req.body; //TODO celebrate
        const dashboard = await dashboardService.findOneById(dashboardId)

        if (dashboard.userId != req.user.id) {
            throw new errorService.PermissionDeniedError();
        }

        await graphService.create({ dashboardId, label: "New graph", width: 3, height: 6, layoutX: 0, layoutY: 100 });

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};
