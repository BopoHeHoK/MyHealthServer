const Router = require('express')
const router = new Router()
const WeightController = require('../controllers/weightController')

router.get('/', WeightController.getAll)
router.get('/:id', WeightController.getOne)
router.put('/', WeightController.update)

module.exports = router