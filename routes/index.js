import { CONFIG } from '../config'
import admin from './admin'
import user from './users'

export default app => {
  app.use(CONFIG.PUBLICPATH, admin)
  app.use('/user', user)
}

