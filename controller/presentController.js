const sequelize = require("sequelize");
const Present = require("../models").present

module.exports = {
    async getPresentsByUser(req, res) {
        let userId = req.params.id
        try {
            const presentCollection = await Present.findAll({
                attributes: ['label', 'url', 'description'],
                where: {
                    user: userId
                }
            })
            res.status(201).send(presentCollection)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },
    async getPresentById(req, res) {
        let presentId = req.params.id
        try {
            const present = await Present.findOne({
                attributes: ['label', 'url', 'description','bought'],
                where: {
                    id: presentId
                }
            })
            res.status(201).send(present)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },
    async getSelfPresentById(req, res) {
        let presentId = req.params.id
        try {
            const present = await Present.findOne({
                attributes: ['label', 'url', 'description'],
                where: {
                    id: presentId
                }
            })
            res.status(201).send(present)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },
    async createPresent(req, res) {
        try {
            const presentCollection = await Present.create({
                label: req.body.label,
                url: req.body.url,
                description: req.body.description,
                user: req.body.user,
                event: req.body.event,
            })
            res.status(201).send(presentCollection)
        } catch (e) {
            console.log(e)
            res.status(400).send(e)
        }
    },
}
