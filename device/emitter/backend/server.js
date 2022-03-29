const express = require('express')
const axios = require('axios');
const app = express()
const port = 3005
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATA_SEND_THRESHOLD = 1;

let data = {
    emitterKey: "ae26fg15-ae52",
    emitterId: "37acd652-a9ec",
    collectorsValues: {

    }
};
let dataCounter = 0;



app.post('/', async (req, res, next) => {
    console.log("Collector sent data")
    dataCounter++

    const { collectorId, co2, air_quality, humidity, temperature, pm1_0, pm2_5, pm10_0 } = req.body;

    if (!data.collectorsValues[collectorId]) {
        data.collectorsValues[collectorId] = {
            collectorId: collectorId,
            timestamps: [],
            values: {
                "co2": [],
                "air_quality": [],
                "humidity": [],
                "temperature": [],
                "pm1_0": [],
                "pm2_5": [],
                "pm10_0": [],
            }
        }
    }

    data.collectorsValues[collectorId].timestamps.push(Math.floor(parseInt(Date.now()) / 1000))
    data.collectorsValues[collectorId].values["co2"].push(co2);
    data.collectorsValues[collectorId].values["air_quality"].push(air_quality);
    data.collectorsValues[collectorId].values["humidity"].push(humidity);
    data.collectorsValues[collectorId].values["temperature"].push(temperature);
    data.collectorsValues[collectorId].values["pm1_0"].push(pm1_0);
    data.collectorsValues[collectorId].values["pm2_5"].push(pm2_5);
    data.collectorsValues[collectorId].values["pm10_0"].push(pm10_0);


    if (dataCounter >= DATA_SEND_THRESHOLD) {
        console.log("sending data");
        const res = await axios.post("http://localhost:3000/api/data", data);
        console.log(res);
        data = {
            emitterKey: "ae26fg15-ae52",
            emitterId: "37acd652-a9ec",
            collectorsValues: {

            }
        };
        dataCounter = 0;
    }
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})