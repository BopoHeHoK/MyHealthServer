const ApiError = require('../error/ApiError')
const { Medicine, MedicineInfo } = require('../models/models')

class MedicineController {

    async create(req, res, next) {
        try {
            let { userId, medicineInfo } = req.body
            const medicine = await Medicine.create({ userId })
            if (medicineInfo) {
                medicineInfo = JSON.parse(medicineInfo)
                medicineInfo.forEach(element =>
                    MedicineInfo.create({
                        description: element.description,
                        time: element.time,
                        medicine: element.medicine,
                        start_day: element.start_day,
                        end_day: element.end_day,
                        medicineId: medicine.id
                    })
                );
            }
            return res.json(medicine)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const medicine = await Medicine.findAndCountAll()
        return res.json(medicine)
    }

    async getOne(req, res) {
        const { id } = req.params
        const medicineItem = await Medicine.findOne({
            where: { id: id },
            include: [{ model: MedicineInfo, as: 'medicineInfo' }]
        })
        return res.json(medicineItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const medicineItem = await Medicine.destroy({ where: { id } })
            return res.json(medicineItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            let { id, } = req.body
            const medicineItem = await Medicine.upsert({ id, })
            return res.json(medicineItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new MedicineController()