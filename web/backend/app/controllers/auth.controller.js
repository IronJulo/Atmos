const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const bcrypt = require('bcrypt')

exports.register = async (req, res, next) => {
    try {
        console.log("user registering in");
        const { email, name, password } = req.body; // TODO celebrate
        await authService.register({ email, name, password });
        res.status(201).json({ email, name });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        console.log("user logging in!");
        const { email, password } = req.body; // TODO celebrate
        const user = await userService.findOneByEmail(email);
        if (!bcrypt.compareSync(password, user.password)) {
            throw new errorService.InvalidEmailOrPasswordError();
        }
        const tokens = authService.tokenize({
            name: user.name,
            email: user.email,
            id: user.id
        });
        return res.status(200).json(tokens);
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res, next) => {
    try {
        console.log("user logging out!");
        const { refreshToken } = req.body;
        if (!refreshToken) return res.sendStatus(401); // TODO celebrate
        authService.logout(refreshToken);
        return res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

exports.user = (req, res, next) => {
    try {
        console.log("user requested his data!");
        const authHeader = req.headers['authorization']; // TODO celebrate
        const token = authHeader.split(' ')[1];
        const user = authService.detokenize(token)
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

exports.refreshToken = (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401); // TODO celebrate
    const token = authService.refreshToken(refreshToken);
    res.status(201).json(token);
};

