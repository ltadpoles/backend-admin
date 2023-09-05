
import express from 'express'
import User from '../controller/user'
import { superAdminAcl } from '../middlewares/acl'
const router = express.Router()

router.get('/info', User.info)
router.get('/menu', User.menu)
router.post('/update', superAdminAcl, User.update)
router.post('/list', User.list)

export default router
