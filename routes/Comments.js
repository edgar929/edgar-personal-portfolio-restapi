const express = require('express')
const router = express.Router()
const commentCtrl = require('../controller/Comments')

router.post('/:id',commentCtrl.addComment )
router.get('/:id', commentCtrl.getComments)

module.exports = router