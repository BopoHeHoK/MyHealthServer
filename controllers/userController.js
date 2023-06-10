const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const { User, UserParameter, Rating, UserFavoriteArticle, Dream, MentalCondition, PhysicalCondition, Water, Food, Medicine, Weight, Pressure, MedicineInfo, MedicineInfoTime, PhysicalInfo, MentalInfo, DreamInfo } = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: "30d" })
}

class UserController {

    async registration(req, res, next) {
        let { email, first_name, last_name, password, roleId } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или пароль"))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        if (!roleId) {
            roleId = 1
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, first_name, last_name, password: hashPassword, roleId })
        await UserParameter.create({ userId: user.id })
        await UserFavoriteArticle.create({ userId: user.id })
        await Water.create({ userId: user.id })
        await Food.create({ userId: user.id })
        await Medicine.create({ userId: user.id })
        await Weight.create({ userId: user.id })
        await Pressure.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.roleId)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal("Пользователь с таким email не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль"))
        }
        const token = generateJwt(user.id, user.email, user.roleId)
        return res.json({ token })

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }

    async getUser(req, res) {
        const { id } = req.params
        const user = await User.findOne({ where: { id } })
        return res.json(user)
    }

    async editUser(req, res) {
        const { id, username, email, phone } = req.body
        const user = await User.upsert({ id, username, email, phone })
        return res.json(user)
    }

    async getAll(req, res) {
        let { sort, page, limit } = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let user
        if (!sort) {
            user = await User.findAndCountAll({
                limit,
                offset,
                foreignKey: 'userId',
                include: [
                    { model: UserParameter, as: "userParameter" },
                    { model: Rating, as: "rating" },
                    { model: UserFavoriteArticle, as: "userFavoriteArticle" },
                    { model: Dream, as: "dream" },
                    { model: PhysicalCondition, as: "physicalCondition" },
                    { model: MentalCondition, as: "mentalCondition" },
                    { model: Water, as: "water" },
                    { model: Food, as: "food" },
                    { model: Medicine, as: "medicine" },
                    { model: Weight, as: "weight" },
                    { model: Pressure, as: "pressure" }
                ]
            })
        } else if (sort == "По дате созадния (новые)") {
            user = await User.findAndCountAll({
                order: [['createdAt', 'DESC']],
                limit,
                offset,
                foreignKey: 'userId',
                include: [
                    { model: UserParameter, as: "userParameter" },
                    { model: Rating, as: "rating" },
                    { model: UserFavoriteArticle, as: "userFavoriteArticle" },
                    { model: Dream, as: "dream" },
                    { model: PhysicalCondition, as: "physicalCondition" },
                    { model: MentalCondition, as: "mentalCondition" },
                    { model: Water, as: "water" },
                    { model: Food, as: "food" },
                    { model: Medicine, as: "medicine" },
                    { model: Weight, as: "weight" },
                    { model: Pressure, as: "pressure" }
                ]
            })
        } else if (sort == "По дате созадния (старые)") {
            user = await User.findAndCountAll({
                order: [['createdAt', 'ASC']],
                limit,
                offset,
                foreignKey: 'userId',
                include: [
                    { model: UserParameter, as: "userParameter" },
                    { model: Rating, as: "rating" },
                    { model: UserFavoriteArticle, as: "userFavoriteArticle" },
                    { model: Dream, as: "dream" },
                    { model: PhysicalCondition, as: "physicalCondition" },
                    { model: MentalCondition, as: "mentalCondition" },
                    { model: Water, as: "water" },
                    { model: Food, as: "food" },
                    { model: Medicine, as: "medicine" },
                    { model: Weight, as: "weight" },
                    { model: Pressure, as: "pressure" }
                ]
            })
        }
        return res.json(user)
    }

    async getOne(req, res) {
        const { id } = req.params
        const userItem = await User.findOne({
            where: { id: id },
            foreignKey: 'userId',
            include: [
                { model: UserParameter, as: "userParameter" },
                { model: Rating, as: "rating" }, //rating
                { model: UserFavoriteArticle, as: "userFavoriteArticle" },
                {
                    model: Dream, as: "dream", include: [
                        { model: DreamInfo, as: "dreamInfo" }
                    ]
                },
                {
                    model: PhysicalCondition, as: "physicalCondition", include: [
                        { model: PhysicalInfo, as: "physicalInfo" }
                    ]
                },
                {
                    model: MentalCondition, as: "mentalCondition", include: [
                        { model: MentalInfo, as: "mentalInfo" }
                    ]
                },
                { model: Water, as: "water" },
                { model: Food, as: "food" },
                {
                    model: Medicine, as: "medicine", include: [
                        {
                            model: MedicineInfo, as: "medicineInfo", include: [
                                { model: MedicineInfoTime, as: "medicineInfoTime" }
                            ]
                        }]
                },
                { model: Weight, as: "weight" },
                { model: Pressure, as: "pressure" }
            ]
        })
        return res.json(userItem)
    }
}

module.exports = new UserController()