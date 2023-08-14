const CustomErros = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token) {
        throw new CustomErros.UnauthenticatedError('Authentication Invalid');
    };

    try {
        const {name, userId, role} = isTokenValid({token});
        req.user = {name, userId, role};
    } catch (error) {
        throw new CustomErros.UnauthenticatedError('Authentication Invalid');
    };
    next();
};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new CustomErros.UnauthorizedError(
                'Unauthorized to access this route'
            );
        };
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizePermissions,
}
