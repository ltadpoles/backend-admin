
import express from 'express'
import User from '../controller/user'
const router = express.Router()

router.get('/info', User.info)
router.get('/menu', User.menu)
router.post('/update', User.update)

export default router
