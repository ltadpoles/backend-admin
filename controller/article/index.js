import sequelize from 'sequelize'
import ArticleSchema from '../../models/article'
import response from '../../utils/response'
import TagSchema from '../../models/tag'
import ArticleTag from '../../models/article/tags'

const Op = sequelize.Op

class Article {
    // constructor() { }

    async add(req, res) {
        const { title, image, type, link, status, content, tags } = req.body

        if (!title || !image || !content || !tags || !tags.length) {
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
            const newArt = await ArticleSchema.create(newArticle)
            const tag = await TagSchema.findAll({ where: { id: tags } })
            await newArt.setTag(tag)

            res.send(response.success({ msg: '新增成功' }))
        } catch (err) {
            res.send(response.fail({ msg: err.message }))
        }
    }

}

export default new Article