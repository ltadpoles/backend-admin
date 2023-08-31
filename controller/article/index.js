import sequelize from 'sequelize'
import ArticleSchema from '../../models/article'
import response from '../../utils/response'
import TagSchema from '../../models/tag'
import CategorySchema from '../../models/category'
import ArticleTag from '../../models/article/tags'
import ArticleCategory from '../../models/article/category'
import UserSchema from '../../models/user'

const Op = sequelize.Op

class Article {
    // constructor() { }

    async add(req, res) {
        const { title, image, type, link, status, content, tags, categorys } = req.body

        if (!title || !image || !content || !Array.isArray(tags) || !tags.length || !categorys) {
            return res.send(response.fail({ msg: '参数错误' }))
        }

        const newArticle = {
            title,
            image,
            type,
            link,
            status,
            content,
            createTime: Date.now(),
            updateTime: Date.now(),
            operator: req.auth.userId,
            operatorName: req.auth.username
        }

        try {
            // 关联标签
            const tag = await TagSchema.findAll({ where: { id: tags } })
            if (!Array.isArray(tag) || tag.length < 1 || tag.length !== tags.length) {
                throw new Error('标签参数错误')
            }
            const category = await CategorySchema.findOne({ where: { id: categorys } })
            if (!category) {
                throw new Error('分类参数错误')
            }
            const newArt = await ArticleSchema.create(newArticle)
            await newArt.setTag(tag)
            await newArt.setCategory(category)

            res.send(response.success({ msg: '新增成功' }))
        } catch (err) {
            res.send(response.fail({ msg: err.message }))
        }
    }

    async list(req, res) {
        const { pageSize = 10, pageNum = 1, param = {} } = req.body
        const { title, tags, category, type, startTime, endTime } = param

        let where = {}

        if (title) {
            where = Object.assign(where, {
                title: {
                    [Op.like]: `%${title}%`
                }
            })
        }

        if (type) {
            where = Object.assign(where, {
                type
            })
        }

        if (startTime && endTime) {
            where = Object.assign(where, {
                createTime: {
                    [Op.between]: [startTime, endTime]
                }
            })
        }

        try {
            const { count, rows } = await ArticleSchema.findAndCountAll({
                include: [
                    {
                        model: TagSchema,
                        as: 'tag',
                        through: {
                            attributes: []
                        }, // 关联表信息
                        attributes: ['name', 'id', 'decription']
                    },
                    {
                        model: CategorySchema,
                        as: 'category',
                        through: {
                            attributes: []
                        }, // 关联表信息
                        attributes: ['name', 'id', 'decription']
                    }
                ],
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

}

export default new Article