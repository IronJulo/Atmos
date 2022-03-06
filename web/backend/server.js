const env = require("./app/config/env.config.js");

const express = require("express");
const app = express();

const db = require("./app/models");
db.sequelize.sync();

const cors = require("cors");

var corsOptions = {
    origin: env.CORS_URL
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/auth.routes")(app);
require("./app/routes/dashboard.routes")(app);
require("./app/routes/graph.routes")(app);
require("./app/routes/masterNode.routes")(app);
require("./app/routes/slaveNode.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/graphData.routes")(app);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}.`);
})

