const express    = require('express')
const router     = express.Router()
const controller = require('../controllers/stats') 

router.get('/year', controller.year)
// router.get('/day', controller.day)
// router.get('/week', controller.week)


module.exports = router