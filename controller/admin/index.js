import formidable from 'formidable'
import UserSchema from '../../models/user'
import { createToken } from '../../utils/token'
import crypto from '../../utils/crypto'

class Admin {
  // constructor() { }

  // 登录
  async login(req, res) {
    const form = formidable()
    form.parse(req, async (err, fields) => {
      if (err) {
        res.send({
          code: '1',
          msg: '表单信息错误'
        })
        return
      }
      const { username, password } = fields

      try {
        if (!username || !password) {
          throw new Error('用户名或密码有误')
        }
      } catch (err) {
        res.send({
          code: '1',
          msg: err.message
        })
      }

      try {
        const user = await UserSchema.findOne({ where: { username } })

        // 加密后的密码比对
        const cryptoPassword = crypto.getHmacHash(password.toString())
        console.log(cryptoPassword)

        if (!user || password.toString() !== user.password.toString()) {
          res.send({
            code: '1',
            msg: '账号或密码有误'
          })
          return
        }

        const token = createToken({ username, state: user.state })

        res.send({
          code: '0',
          data: {
            token
          },
          msg: '登录成功'
        })

      } catch (err) {
        res.send({
          code: '1',
          msg: '登录失败'
        })
      }
    })
  }
}

export default new Admin