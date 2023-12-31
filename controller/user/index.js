import UserSchema from '../../models/user'
import sequelize from 'sequelize'
import response from '../../utils/response'

const Op = sequelize.Op

class User {
  // constructor() { }

  // 获取用户信息
  async info(req, res) {
    try {
      const data = await UserSchema.findOne({ where: { userId: req.auth.userId }, attributes: { exclude: ['password'] } })
      if (!data) {
        return res.send(response.fail({ msg: '用户不存在' }))
      }
      res.send(response.success({ data }))
    } catch (err) {
      res.send(response.fail({ msg: err.message }))
    }

  }

  async update(req, res) {
    const { avatar, name, sex, phone, email, address, description, userId } = req.body
    if (!userId) {
      return res.send(response.fail({ msg: 'userId不能为空' }))
    }

    const user = await UserSchema.findOne({ where: { userId: req.body.userId } })
    if (!user) {
      return res.send(response.fail({ msg: '用户不存在' }))
    }

    const updateData = async () => {
      try {
        await UserSchema.update({ avatar, name, sex, phone, email, address, description, updateTime: Date.now(), operator: req.auth.userId, operatorName: req.auth.username }, {
          where: {
            userId: req.body.userId
          }
        })
        res.send(response.success({ msg: '更新成功' }))
      } catch (err) {
        return res.send(response.fail({ msg: err.message }))
      }
    }
    // 超级管理员
    const auth = req.auth
    if (auth.state === 0) {
      updateData()
    } else {
      // 如果登录用户与要修改的用户不同
      if (userId !== auth.userId) {
        return res.send(response.fail({ code: '403', msg: '权限不足，请联系管理员' }))
      }
      updateData()
    }
  }

  async list(req, res) {
    const { pageSize = 10, pageNum = 1, param = {} } = req.body
    const { username, name } = param
    let where = {}

    if (username) {
      where = Object.assign(where, {
        username: {
          [Op.like]: `%${username}%`
        }
      })
    }
    if (name) {
      where = Object.assign(where, {
        name: {
          [Op.like]: `%${name}%`
        }
      })
    }

    try {
      const { count, rows } = await UserSchema.findAndCountAll({
        where,
        order: [['createTime', 'DESC']],
        offset: pageSize * (pageNum - 1),
        limit: pageSize
      })
      const data = { total: count, list: rows }
      res.send(response.success({ data }))
    } catch (err) {
      res.send(response.fail({ msg: err.message }))
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