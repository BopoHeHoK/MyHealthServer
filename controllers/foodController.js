const ApiError = require('../error/ApiError')
const { Food } = require('../models/models')

class FoodController {

    async create(req, res, next) {
        try {
            let { userId } = req.body
            const food = await Food.create({
                mode,
                time1,
                time1_mode,
                time2,
                time2_mode,
                time3,
                time3_mode,
                time4,
                time4_mode,
                time5,
                time5_mode,
                userId
            })
            return res.json(food)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const food = await Food.findAndCountAll()
        return res.json(food)
    }

    async getOne(req, res) {
        const { id } = req.params
        const foodItem = await Food.findOne({ where: { id: id } })
        return res.json(foodItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const foodItem = await Food.destroy({ where: { id } })
            return res.json(foodItem)
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
                time3,
                time3_mode,
                time4,
                time4_mode,
                time5,
                time5_mode
            } = req.body
            const foodItem = await Food.upsert({
                id,
                mode,
                time1,
                time1_mode,
                time2,
                time2_mode,
                time3,
                time3_mode,
                time4,
                time4_mode,
                time5,
                time5_mode,
            })
            return res.json(foodItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

}

module.exports = new FoodController()