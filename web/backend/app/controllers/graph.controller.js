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

        let result = {
            series: [
                {
                    id: 0,
                    name: "main Temperature",
                    type: "line",
                    unit: "°C",
                    data: [[1646011338, 25], [1646021338, 49], [1646031338, 33], [1646041338, 46], [1646051338, 3], [1646061338, 15], [1646071338, 24], [1646081338, 12], [1646091338, 43], [1646101338, 42], [1646111338, 47], [1646121338, 9], [1646131338, 29], [1646141338, 11], [1646151338, 45], [1646161338, 31], [1646171338, 22], [1646181338, 29], [1646191338, 28], [1646201338, 49], [1646211338, 23], [1646221338, 7], [1646231338, 46], [1646241338, 3], [1646251338, 15], [1646261338, 21], [1646271338, 41], [1646281338, 41], [1646291338, 39], [1646301338, 12], [1646311338, 18], [1646321338, 25], [1646331338, 49], [1646341338, 27], [1646351338, 17], [1646361338, 21], [1646371338, 46], [1646381338, 28], [1646391338, 22], [1646401338, 41], [1646411338, 49], [1646421338, 14], [1646431338, 14], [1646441338, 16], [1646451338, 40], [1646461338, 46], [1646471338, 48], [1646481338, 42], [1646491338, 49], [1646501338, 44], [1646511338, 29], [1646521338, 3], [1646531338, 13], [1646541338, 42], [1646551338, 30], [1646561338, 7], [1646571338, 20], [1646581338, 13], [1646591338, 35]]
                },
                {
                    id: 1,
                    name: "main Humidity",
                    type: "bar",
                    unit: "%",
                    data: [[1646011338, 38], [1646021338, 8], [1646031338, 24], [1646041338, 16], [1646051338, 43], [1646061338, 28], [1646071338, 21], [1646081338, 10], [1646091338, 10], [1646101338, 24], [1646111338, 48], [1646121338, 26], [1646131338, 43], [1646141338, 5], [1646151338, 5], [1646161338, 6], [1646171338, 31], [1646181338, 7], [1646191338, 20], [1646201338, 43], [1646211338, 21], [1646221338, 42], [1646231338, 35], [1646241338, 5], [1646251338, 27], [1646261338, 31], [1646271338, 27], [1646281338, 1], [1646291338, 14], [1646301338, 26], [1646311338, 23], [1646321338, 36], [1646331338, 26], [1646341338, 44], [1646351338, 22], [1646361338, 27], [1646371338, 47], [1646381338, 8], [1646391338, 20], [1646401338, 25], [1646411338, 50], [1646421338, 42], [1646431338, 17], [1646441338, 22], [1646451338, 2], [1646461338, 13], [1646471338, 16], [1646481338, 5], [1646491338, 24], [1646501338, 34], [1646511338, 39], [1646521338, 24], [1646531338, 27], [1646541338, 30], [1646551338, 15], [1646561338, 33], [1646571338, 28], [1646581338, 25], [1646591338, 24]]
                },
            ]
        };

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
        /*const { emitterId, measurement, unit, type, alias, grouping, graphId } = req.body; // TODO celebrate
        const emitter = await emitterService.findOneById(emitterId);

        if (emitter.userId != req.user.id) {
            throw new errorService.PermissionDeniedError();
        }*/
        const { graphId } = req.params; // TODO celebrate
        console.log("graphId");
        console.log(graphId);

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
        
        await graphService.create({ dashboardId, label: "New graph", width: 3, height: 6, layoutX: 0, layoutY: 0 });

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};
