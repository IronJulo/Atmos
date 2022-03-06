const env = require("../config/env.config.js");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

let refreshTokens = []; //TODO CHANGE THIS TO REDIS / DB !IMPORTANT

class InvalidEmailOrPasswordError extends Error {
    constructor() {
        super("Wrong password or email");
        this.status = 403;
    }
}
class InvalidRefreshTokenError extends Error {
    constructor() {
        super("Refresh is invalid");
        this.status = 403;
    }
}
class InvalidTokenError extends Error {
    constructor() {
        super("Token is invalid");
        this.status = 403;
    }
}

class SequelizeConstraintError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.InvalidTokenError = InvalidTokenError;


function generateAccessToken(user) {
    return jwt.sign(user, env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, env.REFRESH_TOKEN_SECRET);
}

function hashPassword(password) {
    let passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return passwordHash;
}

exports.register = async ({ name, email, password }) => {
    try {
        const passwordHash = hashPassword(password);
        await userService.create({ name, email, password: passwordHash });
    } catch (err) {
        throw new SequelizeConstraintError(err.errors[0].message, 409);
    }
}

exports.login = async (email, password) => {
    const user = await userService.findOneByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new InvalidEmailOrPasswordError(); // TODO hash password
    }

    const { name, id } = user;

    const refreshToken = generateRefreshToken({ name, email, id});
    refreshTokens.push(refreshToken);

    return {
        accessToken: generateAccessToken({ name, email, id}),
        refreshToken
    };
}

exports.logout = (refreshToken) => {
    if (!refreshTokens.includes(refreshToken)) {
        throw new InvalidRefreshTokenError();
    }
    refreshTokens.splice(refreshTokens.indexOf(refreshToken));
}

exports.user = (token) => {
    try {
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET); //todo jwt.decode instead
        return { email: decoded.email, name: decoded.name };
    } catch (err) {
        throw new InvalidTokenError();
    }
}

exports.refreshToken = (refreshToken) => {
    if (!refreshTokens.includes(refreshToken)) { //TODO replace call to db
        throw new InvalidRefreshTokenError();
    }
    try {
        const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
        return generateAccessToken({ email: decoded.email, name: decoded.name });
    } catch (err) {
        throw new InvalidRefreshTokenError();
    }
}
/**
 * Autenticate the jwt token
 */
exports.autenticateToken = (req, res, next) => {
    try {
        console.log("cheking user token");
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);

        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        req.user = { email: decoded.email, name: decoded.name, id: decoded.id };
        next()

    } catch (err) {
        throw new InvalidTokenError();
    }
};