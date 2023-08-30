
import express from 'express'
import Article from '../controller/article'
const router = express.Router()

router.post('/add', Article.add)

export default router
