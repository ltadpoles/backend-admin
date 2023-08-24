
import express from 'express'
import User from '../controller/user'
const router = express.Router()

router.get('/info', User.info)
router.get('/menu', User.menu)

export default router
