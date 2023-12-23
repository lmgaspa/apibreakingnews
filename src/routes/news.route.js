const router = require('express').Router();
const  authMiddleware  = require('../middlewares/auth.middleware.js')
const { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews, addComment,
deleteComment } = require('../controllers/news.controller.js');

router.post('/', authMiddleware, create)
router.get('/', findAll)
router.get('/top', topNews)
router.get('/search', searchByTitle)
router.get('/byUser', authMiddleware, byUser)
router.get('/:id', authMiddleware, findById)
router.patch('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, erase)
router.patch('/like/:id', authMiddleware, likeNews)
router.patch('/comment/:id', authMiddleware, addComment)
router.patch('/comment/:idNews/:idComment', authMiddleware, deleteComment)

module.exports = router