const Router = require('express')
const router = new Router()
const WaterController = require('../controllers/waterController')

router.get('/', WaterController.getAll)
router.get('/:id', WaterController.getOne)
router.put('/', WaterController.update)

module.exports = router