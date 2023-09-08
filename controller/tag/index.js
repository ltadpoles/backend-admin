import sequelize from 'sequelize'
import TagSchema from '../../models/tag'
import response from '../../utils/response'
import ArticleTag from '../../models/article/tags'

const Op = sequelize.Op

class Tag {
  // constructor() { }

  // 新增标签
  async add(req, res) {
    const { name, description, status } = req.body

    if (!name) {
      return res.send(response.fail({ msg: '标签名称不能为空' }))
    }

    const newTag = {
      name: name.toLowerCase(),
      description,
      status,
      createTime: Date.now(),
      operator: req.auth.userId,
      operatorName: req.auth.username,
      createUser: req.auth.userId,
      createUserName: req.auth.username
    }

    try {
      const [tag, created] = await TagSchema.findOrCreate({ where: { name: name.toLowerCase() }, defaults: newTag })
      if (!created) {
        throw new Error('标签已存在，请直接使用')
      }
      res.send(response.success({ msg: '标签新增成功', data: tag }))

    } catch (err) {
      res.send(response.fail({ msg: err.message }))
    }
  }

  // 标签删除
  async del(req, res) {
    const { id } = req.query
    try {
      if (!id) {
        throw new Error('标签id不能为空')
      }
      // 支持批量删除
      const ids = id.split(',')
      const tagList = await ArticleTag.findAll({ where: { tagId: ids } })
      if (tagList.length > 0) {
        throw new Error('标签已关联文章，不可删除')
      }
      await TagSchema.destroy({ where: { id: ids } })
      res.send(response.success({ msg: '标签删除成功' }))
    } catch (err) {
      res.send(response.fail({ msg: err.message }))
    }
  }

  // 标签修改
  async update(req, res) {
    const { name, status, description, id } = req.body
    try {
      if (!name) {
        throw new Error('标签名称不能为空')
      }
      if (!id) {
        throw new Error('标签id不能为空')
      }
      const tag = await TagSchema.findOne({ where: { name } })
      if (tag && tag.id !== id) {
        throw new Error('标签已存在，请直接使用')
      }
      await TagSchema.update({
        name: name.toLowerCase(),
        status,
        description,
        updateTime: Date.now(),
        operator: req.auth.userId,
        operatorName: req.auth.username
      }, {
        where: { id }
      })
      res.send(response.success({ msg: '标签修改成功' }))
    } catch (err) {
      res.send(response.fail({ msg: err.message }))
    }
  }

  // 标签列表
  async list(req, res) {
    const { pageSize = 10, pageNum = 1, param = {} } = req.body
    const { name, status, startTime, endTime } = param
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

    if (startTime && endTime) {
      where = Object.assign(where, {
        createTime: {
          [Op.between]: [startTime, endTime]
        }
      })
    }

    try {
      const { count, rows } = await TagSchema.findAndCountAll({
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

export default new Tag