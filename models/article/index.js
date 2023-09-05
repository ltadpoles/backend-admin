'use strict'

import { DataTypes } from 'sequelize'
import sequelize from '../../mysql/db'

const ArticleSchema = sequelize.define(
  'article',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true,
      allowNull: false //不允许为null
    },
    title: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    updateTime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    publishTime: {
      type: DataTypes.BIGINT,
    },
    type: {
      // 创作类型: 1：原创 2：转载
      type: DataTypes.INTEGER(1),
      defaultValue: 1
    },
    link: {
      // 转载链接
      type: DataTypes.STRING
    },
    like: {
      // 点赞喜欢
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    createUser: {
      type: DataTypes.STRING
    },
    createUserName: {
      type: DataTypes.STRING
    },
    operator: {
      type: DataTypes.STRING
    },
    operatorName: {
      type: DataTypes.STRING
    },
    // 状态 1：正常 2：精选
    status: {
      type: DataTypes.INTEGER(1),
      defaultValue: 1
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    html: {
      type: DataTypes.TEXT,
      // allowNull: false
    },
  },
  {
    timestamps: false,
    tableName: 'article'
  }
)

// 模型同步
ArticleSchema.sync()

export default ArticleSchema