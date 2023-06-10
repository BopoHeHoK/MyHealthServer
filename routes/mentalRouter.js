const Router = require('express')
const router = new Router()
const MentalController = require('../controllers/mentalController')

router.post('/', MentalController.create)
router.get('/', MentalController.getAll)
router.get('/:id', MentalController.getOne)
router.delete('/:id', MentalController.remove)
router.put('/', MentalController.update)

module.exports = router