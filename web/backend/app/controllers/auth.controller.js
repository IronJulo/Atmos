const env = require("../config/env.config.js");
const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.users;


exports.register = async (req, res, next) => {
    try {
        console.log("user registering in");
        const { email, name, password } = req.body;
        const user = await userService.create({ email, name, password });
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        console.log("user logging in");
        // TODO verrify input w/ celebrate
        const { email, password } = req.body;
        const tokens = await authService.login(email, password);
        res.status(200).json(tokens);
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res, next) => {
    try {
        console.log("user is logging out");
        const { refreshToken } = req.body.refreshToken;
        if (!refreshToken) return res.sendStatus(400); // TODO change use celebrate

        authService.logout(refreshToken);

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

exports.user = (req, res, next) => {
    try {
        console.log("user requested his data");
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new authService.InvalidTokenError();
        }
        const user = authService.user(token)
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.refreshToken = (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(400); // TODO change use celebrate
    const token = authService.refreshToken(refreshToken);
    res.status(201).json(token);
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
        next();
    });
};