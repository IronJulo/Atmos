const env = require("../config/env.config.js");
const jwt = require("jsonwebtoken");
const db = require("../models");

let refreshTokens = []; //TODO CHANGE THIS TO REDIS / DB !IMPORTANT

exports.login = [(req, res) => {
    //verrify user TODO
    console.log("user logged in");

    const { email, name } = req.body;
    const user = { email, name };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
}];

exports.logout = (req, res) => {
    console.log("user is logging out");
    console.log("req.body");
    console.log(req.body);
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(400); // TODO change use celebrate
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        refreshTokens.splice(refreshToken.indexOf);
        res.sendStatus(200);
    });
};

exports.user = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("jwt.decode(token)");
    console.log(jwt.decode(token));
    res.json(jwt.decode(token));
};

function generateAccessToken(user) {
    return jwt.sign(user, env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, env.REFRESH_TOKEN_SECRET);
}

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(400); // TODO change use celebrate
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const acessToken = generateAccessToken({ email: user.email });
        res.json({ accessToken: acessToken });
    });
};

/**
 * Autenticate the jwt token
 */
exports.autenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log(user);

        next();
    });
};