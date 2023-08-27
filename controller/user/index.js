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