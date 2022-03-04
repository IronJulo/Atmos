const env = require("../config/env.config.js");
const jwt = require("jsonwebtoken");
const db = require("../models");

let refreshTokens = []; //TODO CHANGE THIS TO REDIS / DB !IMPORTANT

function generateAccessToken(user) {
    return jwt.sign(user, env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, env.REFRESH_TOKEN_SECRET);
}

exports.refreshToken = (req, res) => {
    const refreshToken = req.body.token;
    console.log(refreshToken);
    console.log(refreshTokens.includes(refreshToken));
    if (!refreshToken) return res.sendStatus(400); // TODO change use celebrate
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const acessToken = generateAccessToken({name: user.name});
        res.json({accessToken: acessToken});
    });
};

exports.login = (req, res) => {
    //verrify  user TODO
    const username = req.body.name;
    const user = { name: username };
    const acessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({ acessToken: acessToken, refreshToken: refreshToken });
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