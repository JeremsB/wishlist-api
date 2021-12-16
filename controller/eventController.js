const Event = require("../models").event

module.exports = {
    async getActiveEvents(req, res) {
        try {
            const eventCollection = await Event.findAll({
                attributes: ['id', 'label', 'place', 'date'],
                where: {
                    finished: 0
                }
            })
            res.status(201).send(eventCollection)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
}
