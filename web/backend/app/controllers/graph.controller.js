const db = require("../models");
const Op = db.Sequelize.Op;

exports.getDashboardGraphs = (req, res) => {
    res.status(202).send(
        [
            {
                "id": 1,
                "dashboardId": 1,
                "order": 1,
                "label": "Humidity",
                "type": "line",
                "unit": "%",
                "width": "6",
                "height": "2"
            },
            {
                "id": 2,
                "dashboardId": 1,
                "order": 2,
                "label": "Temperature",
                "type": "bar",
                "unit": "°C",
                "width": "6",
                "height": "2"
            },
            {
                "id": 3,
                "dashboardId": 1,
                "order": 3,
                "label": "PPM",
                "type": "line",
                "unit": "PPM",
                "width": "3",
                "height": "3"
            },
            {
                "id": 4,
                "dashboardId": 1,
                "order": 4,
                "label": "Co2",
                "type": "bar",
                "unit": "%",
                "width": "3",
                "height": "3"
            },
            {
                "id": 5,
                "dashboardId": 1,
                "order": 5,
                "label": "Toxicity",
                "type": "line",
                "unit": "%",
                "width": "6",
                "height": "3"
            },
            {
                "id": 6,
                "dashboardId": 1,
                "order": 6,
                "label": "Dhia",
                "type": "line",
                "unit": "%",
                "width": "12",
                "height": "4"
            },
            {
                "id": 7,
                "dashboardId": 1,
                "order": 7,
                "label": "Siph",
                "type": "line",
                "unit": "%",
                "width": "10",
                "height": "3"
            },
            {
                "id": 8,
                "dashboardId": 1,
                "order": 8,
                "label": "Enzo",
                "type": "line",
                "unit": "Se",
                "width": "2",
                "height": "3"
            }
        ]
    );
    return;
};