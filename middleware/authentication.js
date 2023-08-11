const CustomErros = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token) {
        throw new CustomErros.UnauthenticatedError('Authentication Invalid');
    };

    try {
        const payload = isTokenValid({token});
        req.user ={name: payload.name, userId: payload._id, role: payload.role};
    } catch (error) {
        throw new CustomErros.UnauthenticatedError('Authentication Invalid');
    };
    next();
};

module.exports = {
    authenticateUser,
}
