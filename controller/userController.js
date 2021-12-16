const sequelize = require("sequelize");
const CONSTANTS = require("../tools/constants");
const User = require("../models").user
const Present = require("../models").present
const jwt = require("jsonwebtoken");

module.exports = {
    async getOtherUsers(req, res) {
        let current = req.params.current
        try {
            const userCollection = await User.findAll({
                attributes: ['name'],
                include: {
                    attributes: ['id','label', 'url', 'description', 'bought'],
                    model: Present, as: "presents"
                },
                where: {
                    id: {
                        [sequelize.Op.not]: current
                    }
                }
            })
            //res.status(201).send(userCollection)
            res.send(req.user)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },
    async getUserById(req, res) {
        let userId = req.params.id
        try {
            const user = await User.findOne({
                attributes: ['name'],
                include: {
                    attributes: ['id','label', 'url', 'description'],
                    model: Present, as: "presents"
                },
                where: {
                    id: userId
                }
            })
            res.status(201).send(user)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },
    async login(req, res) {
        try {
            let { login, password } = req.body;
            //if (login == null || password == null) throw new WsException(40000);

            let user = await User.findOne({
                attributes: ['id', 'login', 'name', 'parent_id'],
                where: {
                    login: login,
                    password: password
                }
            });
            if (user === null) res.status(401).send('Invalid Credentials');

            let token = jwt.sign(
        {
                    utilisateur_id: user.id,
                    utilisateur_login: user.login,
                    //on expire depuis le front au bout de 30min d'inactivité
                },
                CONSTANTS["TOKEN_KEY"]
            );
            //let refreshToken = jwt.sign({ login: utilisateur.login, refreshKey: utilisateur.refresh_key }, CONSTANTE["TOKEN_KEY"]);

            res.send({
                token: token,
                user: user
               // refreshToken: refreshToken,
            });
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },
}
