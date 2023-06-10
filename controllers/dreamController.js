const ApiError = require('../error/ApiError')
const { Dream, DreamInfo } = require('../models/models')

class DreamController {

    async create(req, res, next) {
        try {
            let { date, quality, dreamInfo, userId } = req.body
            const dream = await Dream.create({ date, quality, userId })
            if (dreamInfo) {
                dreamInfo = JSON.parse(dreamInfo)
                dreamInfo.forEach(element =>
                    DreamInfo.create({
                        description: element.description,
                        dreamId: dream.id
                    })
                );
            }
            return res.json(dream)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const dream = await Dream.findAndCountAll()
        return res.json(dream)
    }

    async getOne(req, res) {
        const { id } = req.params
        const dreamItem = await Dream.findOne({
            where: { id: id },
            include: [{ model: DreamInfo, as: 'dreamInfo' }]
        })
        return res.json(dreamItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const dreamItem = await Dream.destroy({ where: { id } })
            return res.json(dreamItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            const dreamItem = await Dream.bulkCreate(req.body)
            return res.json(dreamItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

}

module.exports = new DreamController()