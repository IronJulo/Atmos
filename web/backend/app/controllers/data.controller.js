const { influxClient } = require("../models");


/**
 * influxClient.getMeasurements usefull for the query editor TODO ! 
 */

exports.saveData = async (req, res, next) => {
    // TODO data from req
    console.log("Emitter sent data");

    /*const reqExample =
    {
        emitterKey: "ae26fg15-ae52",
        emitterId: "37acd652-a9ec",
        collectorsValues: {
            "9b768f00-a9f8":
            {
                timestamps: ["1648496414", "1648496424", "1648496434", "1648496444", "1648496454", "1648496464", "1648496474", "1648496484"],
                values: {
                    "co2": ["402", "400", "405", "410", "400", "300", "450", "400"],
                    "air_quality": ["40", "45", "30", "25", "10", "15", "50", "75"],
                    "humidity": ["20", "22", "20", "22", "20", "22", "20", "22"],
                    "temperature": ["22", "29", "30", "40", "50", "60", "100", "2"],
                    "pm1_0": ["10", "10", "10", "10", "10", "10", "10", "10"],
                    "pm2_5": ["18", "12", "18", "12", "18", "12", "18", "12"],
                    "pm10_0": ["20", "15", "20", "15", "20", "15", "20", "15"]
                },

            }
        }
    };*/

    let influxObjects = [];
    console.log(req.body)
    
    for (let collectorId in req.body.collectorsValues) {
        console.log("collector");
        console.log(collectorId);
        const obj = collectorValuesToInfluxObject(req.body.collectorsValues[collectorId], req.body.emitterId, collectorId)
        influxObjects = influxObjects.concat(obj);
    }
    console.log(influxObjects)
    try {
        await influxClient.writePoints(influxObjects);

        console.log("Sucessfully saved data");
        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

function collectorValuesToInfluxObject(collectorValues, emitterId, collectorId) {
    let result = [];
    for (let valueName in collectorValues.values) {
        for (let j = 0; j < collectorValues.values[valueName].length; j++) {
            result.push({
                measurement: valueName,
                tags: { host: 'localhost', app: 'atmos_backend', emitterId: emitterId, collectorId: collectorId },
                fields: { value: collectorValues.values[valueName][j] },
                timestamp: collectorValues.timestamps[j]
            })
        }
    }
    return result
}


/**
 * query must be valid
 * return [[timestamp, value],[timestamp, value],...,[timestamp, value],]
*/

exports.executeQuery = async (query) => {

    const result = await influxClient.query("select * from " + query.measurement); // TODO


    const resultData = result.map((data) => ([parseInt(data.time.getNanoTime()), data.value]));
    return resultData;
};