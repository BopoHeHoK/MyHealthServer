const Router = require('express')
const router = new Router()
const FoodController = require('../controllers/foodController')

router.get('/', FoodController.getAll)
router.get('/:id', FoodController.getOne)
router.put('/', FoodController.update)

module.exports = router