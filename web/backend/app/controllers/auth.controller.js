const env = require("../config/env.config.js");
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.login = (req, res) => {
    //verrify  user TODO
    const username = req.body.name;
    const user = { name: username };
    const acessToken = jwt.sign(user, env.ACCESS_TOKEN_SECRET);
    res.json({acessToken: acessToken});
    return;
};


/**
 * Autenticate the jwt token
 */
exports.autenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403);
        req.user = payload;
        console.log(payload);
        next();
    });
};