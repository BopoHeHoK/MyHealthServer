const ApiError = require('../error/ApiError')
const { PhysicalCondition, PhysicalInfo } = require('../models/models')

class PhysicalController {

    async create(req, res, next) {
        try {
            let { date, quality, physicalInfo, userId } = req.body
            const physical = await PhysicalCondition.create({ date, quality, userId })
            if (physicalInfo) {
                physicalInfo = JSON.parse(physicalInfo)
                physicalInfo.forEach(element =>
                    PhysicalInfo.create({
                        description: element.description,
                        physicalId: physical.id
                    })
                );
            }
            return res.json(physical)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const physical = await PhysicalCondition.findAndCountAll()
        return res.json(physical)
    }

    async getOne(req, res) {
        const { id } = req.params
        const physicalItem = await PhysicalCondition.findOne({
            where: { id: id },
            include: [{ model: PhysicalInfo, as: 'physicalInfo' }]
        })
        return res.json(physicalItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const physicalItem = await PhysicalCondition.destroy({ where: { id } })
            return res.json(physicalItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            let { id, date, quality } = req.body
            const physicalItem = await PhysicalCondition.upsert({ id, date, quality })
            return res.json(physicalItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new PhysicalController()