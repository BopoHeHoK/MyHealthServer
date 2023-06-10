const ApiError = require('../error/ApiError')
const { Water } = require('../models/models')

class WaterController {

    async create(req, res, next) {
        try {
            let { mode, periodicity, user_id } = req.body
            const water = await Water.create({ mode, periodicity, user_id })
            return res.json(water)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const water = await Water.findAndCountAll()
        return res.json(water)
    }

    async getOne(req, res) {
        const { id } = req.params
        const waterItem = await Water.findOne({ where: { id: id } })
        return res.json(waterItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const waterItem = await Water.destroy({ where: { id } })
            return res.json(waterItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            let { id, mode, periodicity } = req.body
            const waterItem = await Water.upsert({ id, mode, periodicity })
            return res.json(waterItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new WaterController()