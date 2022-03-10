module.exports = app => {
    const graphController = require("../controllers/graph.controller.js");
    const authService = require("../services/auth.service");

    var router = require("express").Router();

    /**
     * Get graphs of a specific dashboard 
     */
    router.get("/graphs/:dashbaoardId", authService.autenticateToken, graphController.getDashboardGraphs);

    /**
     * Get specific graph 
     */
    router.get("/graphs/:graphId", authService.autenticateToken, graphController.getGraph);

    /**
     * Get specific graphs querry  
     */
    router.get("/graphs/:graphId/queries", authService.autenticateToken, graphController.getGraphQueries);
    
    /**
     * Edit specific graphs querry  
     */
     router.put("/graphs/:graphId/queries", authService.autenticateToken, graphController.updateGraphqueries)
     
    /**
     * Get specific graphs data 
     */
    router.get("/graphs/:graphId/queries/data", authService.autenticateToken, graphController.getGraphData);

    /**
     * Get specific graphs data by executing the querri in post body !! proceed with caution
     */
     router.post("/graphs/:graphId/data", authService.autenticateToken, graphController.getGraphData2);

    app.use('/', router);
}