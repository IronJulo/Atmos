const env = require("../config/env.config.js");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

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
exports.InvalidTokenError = InvalidTokenError;


function generateAccessToken(user) {
    return jwt.sign(user, env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, env.REFRESH_TOKEN_SECRET);
}

exports.login = async (email, password) => {
    const user = await userService.findOneByEmail(email);
    if (!user || user.password != password) {
        throw new InvalidEmailOrPasswordError(); // TODO hash password
    }

    const { name } = user;

    const refreshToken = generateRefreshToken({ name, email });
    refreshTokens.push(refreshToken);

    return {
        accessToken: generateAccessToken({ name, email }),
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
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        console.log(decoded);
        return { email: decoded.email, name: decoded.name };
    } catch (err) {
        throw new InvalidTokenError();
    }
}

exports.refreshToken = (refreshToken) => {
    if (!refreshTokens.includes(refreshToken)) {
        throw new InvalidRefreshTokenError();
    }
    try {
        const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
        return generateAccessToken({ email: decoded.email, name: decoded.name });
    } catch (err) {
        throw new InvalidRefreshTokenError();
    }
}
