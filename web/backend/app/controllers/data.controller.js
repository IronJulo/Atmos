const { influxClient } = require("../models");
const emitterController = require("./emitter.controller");


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

exports.executeQuery = async (query, timestampFrom, timestampTo) => {

    const result = await influxClient.query( await buildQuery(query, timestampFrom, timestampTo)); // TODO

    const resultData = result.map((data) => ([parseInt(data.time.getNanoTime()), data.value]));
    console.log(resultData)
    return resultData;
};


async function buildQuery(query, timestampFrom, timestampTo) {
    const emitter = await emitterController.getEmitterById(query.emitterId);
    let request = `select * from ${query.measurement}`;

    request +=  ` where emitterId = '${emitter.key}'`

    if(! timestampTo || timestampTo == 0){
        request +=  ` and time <= now()`
    } else {
        request +=  ` and time <= ${timestampTo}`
    }

    if(! timestampFrom || timestampFrom == 0){
        request +=  ` and time >= now() - 2000h`
    } else {
        request +=  ` and time >= ${timestampFrom}`
    }



    /*if (query.grouping) {
        request += ` GROUP BY 1d;`;
    }*/


    console.log(request)
    return request
}