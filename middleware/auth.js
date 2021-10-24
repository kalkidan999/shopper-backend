const jwt = require('jsonwebtoken')

const JWT_TOKEN = "234567890HGfdscvbnloi*&^%$edfvbnkloiUYTRFDE345678IKJHGFDCVBNUy^t%re#dcfvghjkmnbfre$%^&*&^trfvbnjkiuY765WDFGHUIOLKJHGTREWDFGHJKJHGT"

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
        console.log(decoded)
    } catch (err) {
        return res.status(401).send(" Unauthorized login attempt ");
    }
    return next();
};

module.exports = { verifyToken }
