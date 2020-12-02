const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const contactCtrl = require('../controller/Contact')

router.post('/',contactCtrl.sendMessage)
router.get('/',contactCtrl.getMessages)

module.exports = router