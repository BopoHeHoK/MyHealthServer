const ApiError = require('../error/ApiError')
const { Pressure } = require('../models/models')

class PressureController {

    async create(req, res, next) {
        try {
            let {
                mode,
                time1,
                time1_mode,
                time2,
                time2_mode,
                time,
                time3_mode,
                userId } = req.body
            const pressure = await Pressure.create({
                mode,
                time1,
                time1_mode,
                time2,
                time2_mode,
                time,
                time3_mode,
                userId
            })
            return res.json(pressure)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const pressure = await Pressure.findAndCountAll()
        return res.json(pressure)
    }

    async getOne(req, res) {
        const { id } = req.params
        const pressureItem = await Pressure.findOne({ where: { id: id } })
        return res.json(pressureItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const pressureItem = await Pressure.destroy({ where: { id } })
            return res.json(pressureItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            let {
                id,
                mode,
                time1,
                time1_mode,
                time2,
                time2_mode,
                time,
                time3_mode
            } = req.body
            const pressureItem = await Pressure.upsert({
                id,
                mode,
                time1,
                time1_mode,
                time2,
                time2_mode,
                time,
                time3_mode
            })
            return res.json(pressureItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new PressureController()