const env = require("../config/env.config.js");
const userService = require("../services/user.service");
const errorService = require("../services/error.service");

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

let refreshTokens = []; //TODO CHANGE THIS TO REDIS / DB !IMPORTANT

function generateAccessToken(user) {
    return jwt.sign(user, env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
};

function generateRefreshToken(user) {
    return jwt.sign(user, env.REFRESH_TOKEN_SECRET);
};

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

exports.register = async ({ name, email, password }) => {
    try {
        const passwordHash = hashPassword(password);
        const user = await userService.create({ name, email, password: passwordHash });
        return user;
    } catch (err) {
        throw new errorService.SequelizeConstraintError(err.errors[0].message, 409);
    }
};

exports.logout = (refreshToken) => {
    if (!refreshTokens.includes(refreshToken)) {
        throw new errorService.InvalidRefreshTokenError();
    }
    refreshTokens.splice(refreshTokens.indexOf(refreshToken));
};

exports.tokenize = (user) => {
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    return {
        accessToken: generateAccessToken(user),
        refreshToken: refreshToken
    };
};

exports.detokenize = (token) => {
    try {
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET); //todo jwt.decode instead
        return { name: decoded.name, email: decoded.email, id: decoded.id};
    } catch (err) {
        throw new errorService.InvalidTokenError();
    }
};

exports.refreshToken = (refreshToken) => {
    if (!refreshTokens.includes(refreshToken)) { //TODO replace call to db
        throw new errorService.InvalidRefreshTokenError();
    }
    try {
        const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
        return generateAccessToken({ name: decoded.name, email: decoded.email, id: decoded.id });
    } catch (err) {
        throw new errorService.InvalidRefreshTokenError();
    }
};

exports.autenticateToken = (req, res, next) => {
    try {
        console.log("cheking user token");
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        }

        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        req.user = { email: decoded.email, name: decoded.name, id: decoded.id };
        next()
    } catch (err) {
        throw new errorService.InvalidTokenError();
    }
};