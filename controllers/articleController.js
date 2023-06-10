const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const { Article, Rating } = require('../models/models')

class ArticleController {

    async create(req, res, next) {
        try {
            let { title, content } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))
            const article = await Article.create({ title, content, img: fileName })
            return res.json(article)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        let { sort, page, limit } = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let article
        if (!sort) {
            article = await Article.findAndCountAll({ limit, offset })
        } else if (sort == "По названию (возрастание)") {
            article = await Article.findAndCountAll({ order: [['title', 'ASC']], limit, offset })
        } else if (sort == "По названию (убывание)") {
            article = await Article.findAndCountAll({ order: [['title', 'DESC']], limit, offset })
        } else if (sort == "По популярности (возрастание)") {
            article = await Article.findAndCountAll({ order: [['favorites', 'ASC']], limit, offset })
        } else if (sort == "По популярности (убывание)") {
            article = await Article.findAndCountAll({ order: [['favorites', 'ASC']], limit, offset })
        } else if (sort == "По лайкам (возрастание)") {
            article = await Article.findAndCountAll({ order: [['likes', 'ASC']], limit, offset })
        } else if (sort == "По лайкам (убывание)") {
            article = await Article.findAndCountAll({ order: [['likes', 'DESC']], limit, offset })
        }
        return res.json(article)
    }

    async getOne(req, res) {
        const { id } = req.params
        const articleItem = await Article.findOne({
            where: { id: id },
            include: [{ model: Rating, as: 'rating' }] //rating
        })
        return res.json(articleItem)
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const articleItem = await Article.destroy({ where: { id } })
            return res.json(articleItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res, next) {
        try {
            let { id, title, content, favorites, likes, dislikes } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))
            const articleItem = await Article.upsert({ id, title, content, img: fileName, favorites, likes, dislikes })
            return res.json(articleItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new ArticleController()