const jwt = require('jsonwebtoken')
const appError = require('../utility/appError')

const JWT_TOKEN = "234567890HGfdscvbnloi*&^%$edfvbnkloiUYTRFDE345678IKJHGFDCVBNUy^t%re#dcfvghjkmnbfre$%^&*&^trfvbnjkiuY765WDFGHUIOLKJHGTREWDFGHJKJHGT"

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        next(new appError(403, "A token is required for authentication" ))
    }
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
        console.log(decoded)
    } catch (err) {
        next(new appError(401, " Unauthorized user please login first " ))
    }
    return next();
};

module.exports = { verifyToken }
