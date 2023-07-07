const router = require('express').Router();

const userController = require('../../controllers/users.controller.js')

router.get('/', userController.getAll)
router.post('/register', userController.createUser)
router.put('/:userId/buy/:productId', userController.buyProducts)


module.exports = router;