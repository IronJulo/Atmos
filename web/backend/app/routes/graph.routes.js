module.exports = app => {
    const graphController = require("../controllers/graph.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();

    /**
     * Get all graphs of a specific dashboard 
     */
    router.get("/:dashboardId", authService.autenticateToken, graphController.getDashboardGraphs);

    /**
     * Get specific graph 
     */
    router.get("/:graphId", authService.autenticateToken, graphController.getGraph);

    /**
     * Create a new graph
     */
    router.post("/new", authService.autenticateToken, graphController.create);

    /**
    * Create new specific graphs querry  
    */
    router.post("/:graphId/queries/new", authService.autenticateToken, graphController.createGraphQuery)

    /**
     * Get specific graphs querry  
     */
    router.get("/:graphId/queries", authService.autenticateToken, graphController.getGraphQueries);

    /**
     * Edit specific graphs specific querry   eg: edit querry no 5 TODO delete the first parameter
     */
    router.put("/:graphId/queries/:queryId", authService.autenticateToken, graphController.updateGraphQueries)

    /**
     * DEPRECATED do not use !
     * Edit specific graphs querry  
     */
    //router.put("/:graphId/queries", authService.autenticateToken, graphController.updateGraphQueries)

    /**
     * Get specific graphs data by executing the querry in database 
     */
    router.get("/:graphId/data", authService.autenticateToken, graphController.getGraphData);

    /**
     * DEPRECATED do not use !
     * Get specific graphs data by executing the querry in post body !! proceed with caution
     */
    router.post("/:graphId/data", authService.autenticateToken, graphController.getGraphData2);

    app.use('/graphs', router);
}