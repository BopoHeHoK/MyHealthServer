const ApiError = require('../error/ApiError')
const { Weight } = require('../models/models')

class WeightController {

    async create(req, res, next) {
        try {
            let {
                mode,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                time,
                userId
            } = req.body
            const weight = await Weight.create({
                mode,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                time,
                userId
            })
            return res.json(weight)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const weight = await Weight.findAndCountAll()
        return res.json(weight)
    }

    async getOne(req, res) {
        const { id } = req.params
        const weightItem = await Weight.findOne({ where: { id: id } })
        return res.json(weightItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const weightItem = await Weight.destroy({ where: { id } })
            return res.json(weightItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            let {
                id,
                mode,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                time
            } = req.body
            const weightItem = await Weight.upsert({
                id,
                mode,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                time
            })
            return res.json(weightItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new WeightController()