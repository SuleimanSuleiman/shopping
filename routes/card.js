const express = require('express')
const router = express.Router()
const controller = require('../controllers/card')
const {
    verfityAdmin,
    verfityAdminAndUser
} = require('../utils/verfity')



router.post('/',verfityAdmin,controller.createCard)

module.exports = router