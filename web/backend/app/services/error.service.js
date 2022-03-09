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
        super("Unable to create");
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

module.exports = {
    UnknownUserError,
    UnknownEmitterError,
    UnableToCreateError,
    PermissionDeniedError,
    NotFoundError
};