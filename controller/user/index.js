import UserSchema from '../../models/user'
// import sequelize from '../../mysql/db'
import result from '../../utils/result'

// const Op = sequelize.Op

class User {
  // constructor() { }

  // 获取用户信息
  async info(req, res) {
    try {
      const data = await UserSchema.findOne({ where: { userId: req.auth.userId }, attributes: { exclude: ['password'] } })
      res.send(result.success({ data }))
    } catch (err) {
      res.send(result.fail({ msg: err.message }))
    }

  }

  async update(req, res) {
    const { avatar, name, sex, phone, email, address, dec, userId } = req.body
    if (!userId) {
      return res.send(result.fail({ msg: 'userId不能为空' }))
    }

    const user = await UserSchema.findOne({ where: { userId: req.body.userId } })
    if (!user) {
      return res.send(result.fail({ msg: '用户不存在' }))
    }

    const updateData = async () => {
      try {
        await UserSchema.update({ avatar, name, sex, phone, email, address, dec }, {
          where: {
            userId: req.body.userId
          }
        })
        res.send(result.success({ msg: '更新成功' }))
      } catch (err) {
        return res.send(result.fail({ msg: err.message }))
      }
    }
    // 超级管理员
    const auth = req.auth
    if (auth.state === 0) {
      updateData()
    } else {
      // 如果登录用户与要修改的用户不同
      if (userId !== auth.userId) {
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