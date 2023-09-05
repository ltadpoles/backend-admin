import admin from './admin'
import user from './user'
import tag from './tag'
import category from './category'
import article from './article'

export default app => {
  app.use('/', admin)
  app.use('/user', user)
  app.use('/tag', tag)
  app.use('/category', category)
  app.use('/article', article)
}

