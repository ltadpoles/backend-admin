import user from './users'

export default app => {
  app.use('/', user)
}

