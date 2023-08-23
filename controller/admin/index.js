import Sequelize from 'sequelize'

class Admin {
    constructor() { }

    // 登录
    async login(req, res, next) {
        res.send({
            code: '0',
            msg: '操作成功'
        })
    }
}

export default new Admin