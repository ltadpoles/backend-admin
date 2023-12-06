import sequelize from 'sequelize'
import CategorySchema from '../../models/category'
import response from '../../utils/response'
import ArticleCategory from '../../models/article/category'

const Op = sequelize.Op

class Category {
  // constructor() { }

  // 新增分类
  async add(req, res) {
    const { name, description, status } = req.body

    if (!name) {
      return res.send(response.fail({ msg: '分类名称不能为空' }))
    }

    const newCategory = {
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
      const categoryList = await ArticleCategory.findAll({ where: { categoryId: ids } })
      if (categoryList.length > 0) {
        throw new Error('分类已关联文章，不可删除')
      }
      await CategorySchema.destroy({ where: { id: ids } })
      res.send(response.success({ msg: '分类删除成功' }))
    } catch (err) {
      res.send(response.fail({ msg: err.message }))
    }
  }

  // 分类修改
  async update(req, res) {
    const { status, description, id } = req.body
    try {
      // if (!name) {
      //   throw new Error('分类名称不能为空')
      // }
      if (!id) {
        throw new Error('分类id不能为空')
      }
      // const category = await CategorySchema.findOne({ where: { name } })
      // if (category) {
      //   throw new Error('分类已存在，请直接使用')
      // }
      await CategorySchema.update({
        // name: name.toLowerCase(),
        status,
        description,
        updateTime: Date.now(),
        operator: req.auth.userId,
        operatorName: req.auth.username
      }, {
        where: { id }
      })
      res.send(response.success({ msg: '分类修改成功' }))
    } catch (err) {
      res.send(response.fail({ msg: err.message }))
    }
  }

  // 分类列表
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
      const { count, rows } = await CategorySchema.findAndCountAll({
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

  async listAll(req, res) {
    const { name, id } = req.body
    let where = {
      status: 1
    }

    if (name) {
      where = Object.assign(where, {
        name: {
          [Op.like]: `%${name}%`
        }
      })
    }

    if (id) {
      where = Object.assign(where, {
        id
      })
    }

    try {
      const data = await CategorySchema.findAll({
        where,
        attributes: ['name', 'id'],
        order: [['createTime', 'DESC']],
      })
      res.send(response.success({ data }))
    } catch (err) {
      res.send(response.fail({ msg: err.message }))
    }
  }
}

export default new Category