import Sequelize from 'sequelize'

class Admin {
    constructor() { }

    // 登录
    async login(req, res, next) {
        res.send('登录成功')
    }

    // 获取用户信息
    async info(req, res, next) {
        res.send({
            code: '0',
            data: {
                name: '游荡de蝌蚪',
                age: 18,
                sex: '男'
            }
        })
    }

    // 获取用户菜单
    async menu(req, res, next) {
        res.send('菜单')
    }
}

export default new Admin