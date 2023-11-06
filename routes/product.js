const express = require('express')
const router = express.Router()
const controller = require('../controllers/product.js')
const {
    verfityAdmin,
    verfityAdminAndUser
} = require('../utils/verfity')



router.post('/', verfityAdmin, controller.createProduct)
router.put('/:id', verfityAdmin, controller.updateProduct)


module.exports = router