const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const userService = require('../services/user.service.js')

dotenv.config();

module.exports = authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return res.status(401).send
        }

        const [schema, token] = parts;

        if (schema !== "Bearer") {
            return res.status(401).send;
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Token invalid!" })
            }

            const user = await userService.findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send({ message: 'Invalid Token' })
            }
            req.userId = user.id;

            return next();
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
}