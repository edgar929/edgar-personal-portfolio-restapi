const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/User')
const auth = require('../middleware/auth')
router.post('/',userCtrl.createUser)
router.post('/login',userCtrl.loginUser)
router.post('/logout',auth,userCtrl.logout)
router.get('/me',auth,userCtrl.getUSer)
module.exports = router;