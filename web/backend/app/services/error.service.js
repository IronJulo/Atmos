class UnknownUserError extends Error {
    constructor() {
        super("Unknown user");
        this.status = 404;
    }
};

class UnknownEmitterError extends Error {
    constructor() {
        super("Unknown emitter");
        this.status = 404;
    }
};

class UnableToCreateError extends Error {
    constructor() {
        super("Unable to create ressource");
        this.status = 500;
    }
};

class UnableToUpdateError extends Error {
    constructor() {
        super("Unable to update ressource");
        this.status = 500;
    }
};

class PermissionDeniedError extends Error {
    constructor() {
        super("You do not have permission to access this ressource");
        this.status = 401;
    }
};

class NotFoundError extends Error {
    constructor() {
        super("ressource not found");
        this.status = 404;
    }
};

class InvalidEmailOrPasswordError extends Error {
    constructor() {
        super("Wrong password or email");
        this.status = 403;
    }
};

class InvalidRefreshTokenError extends Error {
    constructor() {
        super("Refresh is invalid");
        this.status = 403;
    }
};

class InvalidTokenError extends Error {
    constructor() {
        super("Token is invalid");
        this.status = 403;
    }
};

class SequelizeConstraintError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
};

module.exports = {
    InvalidEmailOrPasswordError,
    SequelizeConstraintError,
    InvalidRefreshTokenError,
    PermissionDeniedError,
    UnableToCreateError,
    UnknownEmitterError,
    InvalidTokenError,
    UnknownUserError,
    NotFoundError,
};