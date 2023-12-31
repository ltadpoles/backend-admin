import UserSchema from '../../models/user'
import { createToken } from '../../utils/token'
import crypto from '../../utils/crypto'
import response from '../../utils/response'

class Admin {
  // constructor() { }

  // 登录
  async login(req, res) {
    const { username, password } = req.body

    try {
      if (!username) {
        throw new Error('用户名不能为空')
      }
      if (!password) {
        throw new Error('密码不能为空')
      }
    } catch (err) {
      return res.send(response.fail({ msg: err.message }))
    }

    try {
      const user = await UserSchema.findOne({ where: { username } })
      // 加密后的密码比对
      const cryptoPassword = crypto.getHmacHash(password)
      if (!user || cryptoPassword !== user.password) {
        return res.send(response.fail({ msg: '用户名或密码有误' }))
      }

      const token = createToken({ userId: user.userId, username, state: user.state })
      res.send(response.success({ data: { token } }))

    } catch (err) {
      return res.send(response.fail({ msg: err.message }))
    }
  }

  // 注册
  async register(req, res) {
    const { username, password } = req.body

    try {
      if (!username) {
        throw new Error('用户名不能为空')
      }
      if (!password) {
        throw new Error('密码不能为空')
      }
    } catch (err) {
      return res.send(response.fail({ msg: err.message }))
    }

    const newUser = {
      username,
      password: crypto.getHmacHash(password),
      userId: crypto.getMD5Hash(username),
      createTime: Date.now()
    }

    try {
      const [user, created] = await UserSchema.findOrCreate({ where: { username }, defaults: newUser })

      if (!created) {
        throw new Error('用户已存在，请直接登录')
      }
      res.send(response.success({ data: user }))
    } catch (err) {
      return res.send(response.fail({ msg: err.message }))
    }
  }
}

export default new Admin