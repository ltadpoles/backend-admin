// import { genRSAKeyPaire } from '../../utils/crypto'

class User {
  // constructor() { }

  // 获取用户信息
  async info(req, res) {
    // let data = genRSAKeyPaire()

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