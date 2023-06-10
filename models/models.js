const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
})

const Role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, unique: true },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const UserParameter = sequelize.define('user_parameter', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    age: { type: DataTypes.INTEGER },
    height: { type: DataTypes.INTEGER },
    weight: { type: DataTypes.INTEGER },
    waist: { type: DataTypes.INTEGER },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const Gender = sequelize.define('gender', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    gender: { type: DataTypes.STRING, unique: true }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const Dream = sequelize.define('dream', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY },
    quality: { type: DataTypes.INTEGER },
})

const DreamInfo = sequelize.define('dream_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    note: { type: DataTypes.TEXT },
})

const PhysicalCondition = sequelize.define('physical_condition', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY },
    quality: { type: DataTypes.INTEGER },
})

const PhysicalInfo = sequelize.define('physical_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    note: { type: DataTypes.TEXT },
})

const MentalCondition = sequelize.define('mental_condition', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY },
    quality: { type: DataTypes.INTEGER },
})

const MentalInfo = sequelize.define('mental_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    note: { type: DataTypes.TEXT },
})

const Water = sequelize.define('water', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mode: { type: DataTypes.BOOLEAN, defaultValue: false },
    periodicity: { type: DataTypes.INTEGER, defaultValue: 4 },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const Food = sequelize.define('food', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mode: { type: DataTypes.BOOLEAN, defaultValue: false },
    time1: { type: DataTypes.TIME, defaultValue: "7:00" },
    time1Mode: { type: DataTypes.BOOLEAN, defaultValue: true },
    time2: { type: DataTypes.TIME, defaultValue: "10:00" },
    time2Mode: { type: DataTypes.BOOLEAN, defaultValue: true },
    time3: { type: DataTypes.TIME, defaultValue: "13:00" },
    time3Mode: { type: DataTypes.BOOLEAN, defaultValue: true },
    time4: { type: DataTypes.TIME, defaultValue: "16:00" },
    time4Mode: { type: DataTypes.BOOLEAN, defaultValue: true },
    time5: { type: DataTypes.TIME, defaultValue: "19:00" },
    time5Mode: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const Medicine = sequelize.define('medicine', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mode: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const MedicineInfo = sequelize.define('medicine_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mode: { type: DataTypes.BOOLEAN, defaultValue: true },
    medicineName: { type: DataTypes.TEXT },
    medicineDosage: { type: DataTypes.TEXT },
    diseaseName: { type: DataTypes.TEXT },
    startDay: { type: DataTypes.DATEONLY },
    endDay: { type: DataTypes.DATEONLY },
})

const MedicineInfoTime = sequelize.define('medicine_info_time', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mode: { type: DataTypes.BOOLEAN, defaultValue: true },
    time: { type: DataTypes.TIME, defaultValue: "9:00" },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const Weight = sequelize.define('weight', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mode: { type: DataTypes.BOOLEAN, defaultValue: false },
    monday: { type: DataTypes.BOOLEAN, defaultValue: true },
    tuesday: { type: DataTypes.BOOLEAN, defaultValue: true },
    wednesday: { type: DataTypes.BOOLEAN, defaultValue: true },
    thursday: { type: DataTypes.BOOLEAN, defaultValue: true },
    friday: { type: DataTypes.BOOLEAN, defaultValue: true },
    saturday: { type: DataTypes.BOOLEAN, defaultValue: false },
    sunday: { type: DataTypes.BOOLEAN, defaultValue: false },
    time: { type: DataTypes.TIME, defaultValue: "8:00" },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const Pressure = sequelize.define('pressure', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mode: { type: DataTypes.BOOLEAN, defaultValue: false },
    time1: { type: DataTypes.TIME, defaultValue: "7:00" },
    time1Mode: { type: DataTypes.BOOLEAN, defaultValue: true },
    time2: { type: DataTypes.TIME, defaultValue: "13:00" },
    time2Mode: { type: DataTypes.BOOLEAN, defaultValue: true },
    time3: { type: DataTypes.TIME, defaultValue: "18:00" },
    time3Mode: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})

const Article = sequelize.define('article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    favorites: { type: DataTypes.INTEGER, defaultValue: 0 },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
})

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isLike: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const UserFavoriteArticle = sequelize.define('user_favorite_article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const FavoriteArticle = sequelize.define('favorite_article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Role.hasMany(User, { foreignKey: { name: 'roleId' }, as: 'user' })
User.belongsTo(Role)

User.hasOne(UserParameter, { foreignKey: { name: 'userId' }, as: 'userParameter' })
UserParameter.belongsTo(User)

Gender.hasMany(UserParameter, { foreignKey: { name: 'genderId' }, as: 'userParameter' })
UserParameter.belongsTo(Gender)

//Статьи

User.hasMany(Rating, { foreignKey: { name: 'userId' }, as: 'rating' })
Rating.belongsTo(User)

User.hasOne(UserFavoriteArticle, { foreignKey: { name: 'userId' }, as: 'userFavoriteArticle' })
UserFavoriteArticle.belongsTo(User)

Article.hasMany(Rating, { foreignKey: { name: 'articleId' }, as: 'rating' })
Rating.belongsTo(Article)

Article.hasOne(FavoriteArticle, { foreignKey: { name: 'articleId' }, as: 'favoriteArticle' })
FavoriteArticle.belongsTo(Article)

UserFavoriteArticle.hasMany(FavoriteArticle, { foreignKey: { name: 'userFavoriteArticleId' }, as: 'favoriteArticle' })
FavoriteArticle.belongsTo(UserFavoriteArticle)


//Сон и состояние

User.hasMany(Dream, { foreignKey: { name: 'userId' }, as: 'dream' })
Dream.belongsTo(User)

Dream.hasMany(DreamInfo, { foreignKey: { name: 'dreamId' }, as: 'dreamInfo' })
DreamInfo.belongsTo(Dream)

User.hasMany(PhysicalCondition, { foreignKey: { name: 'userId' }, as: 'physicalCondition' })
PhysicalCondition.belongsTo(User)

PhysicalCondition.hasMany(PhysicalInfo, { foreignKey: { name: 'physicalConditionId' }, as: 'physicalInfo' })
PhysicalInfo.belongsTo(PhysicalCondition)

User.hasMany(MentalCondition, { foreignKey: { name: 'userId' }, as: 'mentalCondition' })
MentalCondition.belongsTo(User)

MentalCondition.hasMany(MentalInfo, { foreignKey: { name: 'mentalConditionId' }, as: 'mentalInfo' })
MentalInfo.belongsTo(MentalCondition)


//Напоминания

User.hasOne(Water, { foreignKey: { name: 'userId' }, as: 'water' })
Water.belongsTo(User)

User.hasOne(Food, { foreignKey: { name: 'userId' }, as: 'food' })
Food.belongsTo(User)

User.hasOne(Medicine, { foreignKey: { name: 'userId' }, as: 'medicine' })
Medicine.belongsTo(User)

Medicine.hasMany(MedicineInfo, { foreignKey: { name: 'medicineId' }, as: 'medicineInfo' })
MedicineInfo.belongsTo(Medicine)

MedicineInfo.hasMany(MedicineInfoTime, { foreignKey: { name: 'medicineInfoId' }, as: 'medicineInfoTime' })
MedicineInfoTime.belongsTo(MedicineInfo)

User.hasOne(Weight, { foreignKey: { name: 'userId' }, as: 'weight' })
Weight.belongsTo(User)

User.hasOne(Pressure, { foreignKey: { name: 'userId' }, as: 'pressure' })
Pressure.belongsTo(User)


module.exports = {
    User,
    Role,
    UserParameter,
    Dream,
    DreamInfo,
    PhysicalCondition,
    PhysicalInfo,
    MentalCondition,
    MentalInfo,
    Water,
    Food,
    Medicine,
    MedicineInfo,
    MedicineInfoTime,
    Weight,
    Pressure,
    Article,
    Rating,
    UserFavoriteArticle,
    FavoriteArticle,
}