import Sequelize from 'sequelize'
import formidable from 'formidable'

class Admin {
    constructor() { }

    // 登录
    async login(req, res, next) {
        const form = formidable();

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ fields, files });
            console.log(fields)
            const { username, password } = fields
            console.log(typeof username)
        });
    }
}

export default new Admin