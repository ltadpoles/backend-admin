
import express from 'express'
import Article from '../controller/article'
const router = express.Router()

router.post('/add', Article.add)
router.post('/list', Article.list)
router.get('/del', Article.del)
router.post('/update', Article.update)
router.get('/info', Article.info)
router.get('/top-change', Article.topChange)

export default router
