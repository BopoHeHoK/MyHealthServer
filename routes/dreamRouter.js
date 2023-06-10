const Router = require('express')
const router = new Router()
const DreamController = require('../controllers/dreamController')

router.post('/', DreamController.create)
router.get('/', DreamController.getAll)
router.get('/:id', DreamController.getOne)
router.delete('/:id', DreamController.remove)
router.put('/', DreamController.update)

module.exports = router