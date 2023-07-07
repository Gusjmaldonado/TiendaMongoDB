const router = require('express').Router();


const productsController = require('../../controllers/products.controller')


router.get('/', productsController.getProducts)
router.get('/:idproducto', productsController.getProductById)

router.post('/', productsController.postProduct)

router.put('/:idproducto', productsController.editPtoduct)

router.delete('/:idproducto', productsController.removeProduct)


module.exports = router;