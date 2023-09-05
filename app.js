
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import router from './routes'
import { expressjwt } from 'express-jwt'
import { CONFIG } from './config'
import response from './utils/response'
import WHITE_API from './config/white-api'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// token校验，白名单不需要验证token
app.use(expressjwt({
  secret: CONFIG.SECRETKEY, algorithms: ['HS256'],
  isRevoked: (req, token) => {
    // token过期之后移除
    try {
      return token.payload.exp < Date.now()
    } catch (err) {
      throw new Error(err)
    }
  }
}).unless({ path: WHITE_API }))

router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.send('404')
  next()
})

// error handler
app.use(function (err, req, res, next) { // eslint-disable-line
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(response.fail({ msg: '登录已过期，请重新登录', code: '401' }))
    return
  }
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500).send(response.fail({ msg: '系统异常，请稍后再试', code: '500' }))
})

export default app
