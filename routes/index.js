import { CONFIG } from '../config'
import admin from './admin'
import user from './user'
import tag from './tag'

export default app => {
  app.use(CONFIG.PUBLICPATH, admin)
  app.use('/user', user)
  app.use('/tag', tag)
}

