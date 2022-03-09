const emitterService = require("../services/emitter.service");
const errorService = require("../services/error.service");
/**
 * Get all emitters of the user
 */
exports.getUserEmitters = async (req, res, next) => {
    try {
        console.log("User requested his emitters!");
        const emitters = await emitterService.findAllOfUser(req.user.id)

        let emittersList = [];
        emitters.map(emitter => (
            emittersList.push({ id: emitter.id, name: emitter.name, key: emitter.key })
        ));
        res.status(200).json(emittersList);

    } catch (err) {
        next(err);
    }
};
/**
 * Deprecated route do not use
 */
exports.getEmitterById = async (req, res, next) => {
    try {
        console.log("User requested 1 emitter data!");
        const emitter = await emitterService.findOneByIds(req.user.id, req.params.emitterId)

        res.status(200).json({
            name: emitter.name,
            key: emitter.key
        });

    } catch (err) {
        next(err);
    }
};

/**
 * Create a new emiter
 */
exports.createEmitter = async (req, res, next) => {
    try {
        console.log("User requested to create a new emitter!");
        
        const { key, name } = req.body;
        const emitter = await emitterService.create({ key, name, userId: req.user.id })
        console.log(emitter);

        if (!emitter) {
            throw new errorService.UnableToCreateError();
        }
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};