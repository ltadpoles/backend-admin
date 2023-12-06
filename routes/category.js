
import express from 'express'
import Category from '../controller/category'
const router = express.Router()

router.post('/add', Category.add)
router.get('/del', Category.del)
router.post('/update', Category.update)
router.post('/list', Category.list)
router.post('/listAll', Category.listAll)

export default router
