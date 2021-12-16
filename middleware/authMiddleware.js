const jwt = require("jsonwebtoken");
const CONSTANTS = require("../tools/constants");

const middleware = {
    authenticateToken: () => {
        return function (req, res, next) {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1] // 'Bearer #token#'

            if (!token) {
                res.sendStatus(401)
            }

            jwt.verify(token, CONSTANTS["TOKEN_KEY"], (err, user) => {
                if (err) {
                    res.sendStatus(401)
                }
                req.user = user
                next();
            });
        };
    },
};
module.exports = middleware;
