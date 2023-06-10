const Router = require('express')
const router = new Router()
const PhysicalController = require('../controllers/physicalController')

router.post('/', PhysicalController.create)
router.get('/', PhysicalController.getAll)
router.get('/:id', PhysicalController.getOne)
router.delete('/:id', PhysicalController.remove)
router.put('/', PhysicalController.update)

module.exports = router