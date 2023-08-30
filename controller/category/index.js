import sequelize from 'sequelize'
import CategorySchema from '../../models/category'
import response from '../../utils/response'

const Op = sequelize.Op

class Category {
    // constructor() { }

    // 新增分类
    async add(req, res) {
        const { name, decription, status } = req.body

        if (!name) {
            return res.send(response.fail({ msg: '分类名称不能为空' }))
        }

        const newCategory = {
            name: name.toLowerCase(),
            decription,
            status,
            createTime: Date.now(),
            updateTime: Date.now(),
            operator: req.auth.userId,
            operatorName: req.auth.username
        }

        try {
            const [category, created] = await CategorySchema.findOrCreate({ where: { name: name.toLowerCase() }, defaults: newCategory })
            if (!created) {
                throw new Error('分类已存在，请直接使用')
            }
            res.send(response.success({ msg: '分类新增成功', data: category }))

        } catch (err) {
            res.send(response.fail({ msg: err.message }))
        }
    }

    // 分类删除
    async del(req, res) {
        const { id } = req.query
        try {
            if (!id) {
                throw new Error('分类id不能为空')
            }
            // 支持批量删除
            const ids = id.split(',')
            const category = await CategorySchema.destroy({ where: { id: ids } })
            if (!category) {
                throw new Error('分类不存在')
            }
            res.send(response.success({ msg: '分类删除成功' }))
        } catch (err) {
            res.send(response.fail({ msg: err.message }))
        }
    }

    // 标签修改
    async update(req, res) {
        const { name, status, decription, id } = req.body
        try {
            if (!name) {
                throw new Error('分类名称不能为空')
            }
            if (!id) {
                throw new Error('分类id不能为空')
            }
            const category = await CategorySchema.findOne({ where: { name } })
            if (category) {
                throw new Error('分类已存在，请直接使用')
            }
            const isUpdate = await CategorySchema.update({
                name: name.toLowerCase(),
                status,
                decription,
                updateTime: Date.now(),
                operator: req.auth.userId,
                operatorName: req.auth.username
            }, {
                where: { id }
            })
            if (!isUpdate[0]) {
                throw new Error('分类不存在')
            }
            res.send(response.success({ msg: '分类修改成功' }))
        } catch (err) {
            res.send(response.fail({ msg: err.message }))
        }
    }

    // 分类列表
    async list(req, res) {
        const { pageSize = 10, pageNum = 1, param = {} } = req.body
        const { name, status } = param
        let where = {}

        if (name) {
            where = Object.assign(where, {
                name: {
                    [Op.like]: `%${name}%`
                }
            })
        }

        if (status) {
            where = Object.assign(where, {
                status
            })
        }

        try {
            const { count, rows } = await CategorySchema.findAndCountAll({
                where,
                order: [['createTime', 'DESC']],
                offset: pageSize * (pageNum - 1),
                limit: pageSize
            });
            const data = { total: count, list: rows }
            res.send(response.success({ data }))
        } catch (err) {
            res.send(response.fail({ msg: err.message }))
        }
    }
}

export default new Category