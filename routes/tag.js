
import express from 'express'
import Tag from '../controller/tag'
const router = express.Router()

router.post('/add', Tag.add)

export default router
