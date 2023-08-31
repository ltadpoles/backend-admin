
import express from 'express'
import Article from '../controller/article'
const router = express.Router()

router.post('/add', Article.add)
router.post('/list', Article.list)

export default router
