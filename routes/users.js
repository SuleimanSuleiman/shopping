const express    = require('express')
const router     = express.Router()
const controller = require('../controllers/users')
const { verfityAdmin, verfityAdminAndUser } = require('../utils/verfity')



router.put   ('/:id'   ,verfityAdmin       ,controller.updateUser)
router.delete('/:id'   ,verfityAdminAndUser,controller.deleteUser)
router.get   ('/'      ,verfityAdmin       ,controller.getUsers  )
router.get   ('/:id'   ,verfityAdmin       ,controller.getUser   )

module.exports = router