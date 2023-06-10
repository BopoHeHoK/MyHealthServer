const Router = require('express')
const router = new Router()
const ArticleController = require('../controllers/articleController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', ArticleController.create)
router.get('/', ArticleController.getAll)
router.get('/:id', ArticleController.getOne)
router.delete('/:id', ArticleController.remove)
router.put('/', ArticleController.update)

module.exports = router