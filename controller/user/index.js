import UserSchema from '../../models/user'
// import sequelize from '../../mysql/db'
import result from '../../utils/result'

// const Op = sequelize.Op

class User {
  // constructor() { }

  // 获取用户信息
  async info(req, res) {
    const data = await UserSchema.findOne({ where: { username: req.auth.username }, attributes: { exclude: ['password'] } })
    res.send(result.success({ data }))
  }

  async update(req, res) {
    const auth = req.auth
    const user = UserSchema.findOne({ where: { username: req.body.username } })
    const { avatar, name, sex, phone, email, address, dec } = req.body
    const updateData = async () => {
      try {
        await UserSchema.update({ avatar, name, sex, phone, email, address, dec }, {
          where: {
            username: req.body.username
          }
        });
        res.send(result.success({ msg: '更新成功' }))
      } catch (err) {
        return res.send(result.fail({ msg: err.message }))
      }
    }
    // 超级管理员
    if (auth.state === 0) {
      updateData()
    } else {
      // 如果登录用户与要修改的用户不同
      if (user.username !== auth.username) {
        return res.send(result.fail({ code: '403', msg: '权限不足，请联系管理员' }))
      }
      updateData()
    }
  }

  // 获取用户菜单
  async menu(req, res) {
    res.send({
      code: '0',
      data: [],
      msg: '操作成功'
    })
  }
}

export default new User