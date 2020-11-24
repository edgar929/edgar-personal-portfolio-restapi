const express = require('express');
const router = express.Router();
const multer = require('../config/multerConfig')
const articleCtrl = require('../controller/Article')
const auth = require('../middleware/auth')

router.post('/',auth,multer,articleCtrl.postArticle);
router.get('/',articleCtrl.getArticles)
router.get('/:id', auth,articleCtrl.getArticle)
router.patch('/:id',auth,multer, articleCtrl.updateArticle)
router.delete('/:id',auth, articleCtrl.deleteArticle)

module.exports = router;