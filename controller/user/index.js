// import { genRSAKeyPaire } from '../../utils/crypto'

// import { varifyToken } from "../../utils/token"

class User {
  // constructor() { }

  // 获取用户信息
  async info(req, res) {
    // let data = genRSAKeyPaire()
    // console.log(req)
    // const token = req.headers.authorization.slice(7)
    // const userInfo = varifyToken(token)
    // console.log(userInfo)

    res.send({
      code: '0',
      data: {},
      msg: '操作成功'
    })
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