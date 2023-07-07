const router = require('express').Router();


router.use('/products', require('./api/product'))

router.use('/users', require('./api/users'))


module.exports = router;