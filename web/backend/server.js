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

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}.`);
})

require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);