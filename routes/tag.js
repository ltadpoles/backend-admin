
import express from 'express'
import Tag from '../controller/tag'
const router = express.Router()

router.post('/add', Tag.add)
router.get('/del', Tag.del)
router.post('/update', Tag.update)
router.post('/list', Tag.list)
router.post('/listAll', Tag.listAll)

export default router
