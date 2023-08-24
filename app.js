
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import router from './routes'
import { expressjwt } from 'express-jwt'
import { CONFIG } from './config'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// token校验，api 开头的基础接口不需要验证token
app.use(expressjwt({ secret: CONFIG.SECRETKEY, algorithms: ['HS256'] }).unless({ path: ['/auth/adminLogin', /^\/api\//] }))

router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.send('404')
  next()
})

// error handler
app.use(function (err, req, res, next) { // eslint-disable-line
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      code: '401',
      msg: '登录已过期，请重新登录'
    })
    return
  }
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500).send({
    code: '500',
    msg: '系统异常，请稍后再试'
  })
})

export default app
