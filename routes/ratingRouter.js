const Router = require('express')
const router = new Router()
const RatingController = require('../controllers/ratingController')

router.post('/', RatingController.create)
router.get('/', RatingController.getAll)
router.get('/:id', RatingController.getOne)
router.delete('/:id', RatingController.remove)
router.put('/', RatingController.update)

module.exports = router