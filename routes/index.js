const Router = require('express')
const router = new Router()
const articleRouter = require('./articleRouter')
const dreamRouter = require('./dreamRouter')
const foodRouter = require('./foodRouter')
const medicineRouter = require('./medicineRouter')
const mentalRouter = require('./mentalRouter')
const physicalRouter = require('./physicalRouter')
const pressureRouter = require('./pressureRouter')
const ratingRouter = require('./ratingRouter')
const userRouter = require('./userRouter')
const waterRouter = require('./waterRouter')
const weightRouter = require('./weightRouter')

router.use('/article', articleRouter)
router.use('/dream', dreamRouter)
router.use('/food', foodRouter)
router.use('/medicine', medicineRouter)
router.use('/mental', mentalRouter)
router.use('/physical', physicalRouter)
router.use('/pressure', pressureRouter)
router.use('/rating', ratingRouter)
router.use('/user', userRouter)
router.use('/water', waterRouter)
router.use('/weight', weightRouter)

module.exports = router