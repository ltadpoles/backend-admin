
import express from 'express'
import Admin from '../controller/admin'
const router = express.Router();

router.post('/login', Admin.login);
router.get('/user/info', Admin.info)
router.get('/menu', Admin.menu)

export default router
