const ApiError = require('../error/ApiError')
const { MentalCondition, MentalInfo } = require('../models/models')

class MentalController {

    async create(req, res, next) {
        try {
            let { date, quality, mentalInfo, userId } = req.body
            const mental = await MentalCondition.create({ date, quality, userId })
            if (mentalInfo) {
                mentalInfo = JSON.parse(mentalInfo)
                mentalInfo.forEach(element =>
                    MentalInfo.create({
                        description: element.description,
                        metnalId: mental.id
                    })
                );
            }
            return res.json(mental)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const mental = await MentalCondition.findAndCountAll()
        return res.json(mental)
    }

    async getOne(req, res) {
        const { id } = req.params
        const mentalItem = await MentalCondition.findOne({
            where: { id: id },
            include: [{ model: MentalInfo, as: 'mentalInfo' }]
        })
        return res.json(mentalItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const mentalItem = await MentalCondition.destroy({ where: { id } })
            return res.json(mentalItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            let { id, date, quality } = req.body
            const mentalItem = await MentalCondition.upsert({ id, date, quality })
            return res.json(mentalItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new MentalController()