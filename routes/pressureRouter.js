const Router = require('express')
const router = new Router()
const PressureController = require('../controllers/pressureController')

router.get('/', PressureController.getAll)
router.get('/:id', PressureController.getOne)
router.put('/', PressureController.update)

module.exports = router