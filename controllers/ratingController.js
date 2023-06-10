const ApiError = require('../error/ApiError')
const { Rating } = require('../models/models')

class RatingController {

    async create(req, res, next) {
        try {
            let { isLike, userId, articleId } = req.body
            const rating = await Rating.create({ isLike, userId, articleId })
            return res.json(rating)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const rating = await Rating.findAndCountAll()
        return res.json(rating)
    }

    async getOne(req, res) {
        const { id } = req.params
        const ratingItem = await Rating.findOne({ where: { id: id } })
        return res.json(ratingItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const ratingItem = await Rating.destroy({ where: { id } })
            return res.json(ratingItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            let { id, isLike } = req.body
            const ratingItem = await Rating.upsert({ id, isLike })
            return res.json(ratingItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new RatingController()