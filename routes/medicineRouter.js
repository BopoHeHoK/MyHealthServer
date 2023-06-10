const Router = require('express')
const router = new Router()
const MedicineController = require('../controllers/medicineController')

router.post('/', MedicineController.create)
router.get('/', MedicineController.getAll)
router.get('/:id', MedicineController.getOne)
router.delete('/:id', MedicineController.remove)
router.put('/', MedicineController.update)

module.exports = router