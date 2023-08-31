'use strict'

import { DataTypes } from 'sequelize'
import sequelize from '../../mysql/db'

const CategorySchema = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true,
      allowNull: false //不允许为null
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    updateTime: {
      type: DataTypes.BIGINT,
    },
    operator: {
      type: DataTypes.STRING
    },
    operatorName: {
      type: DataTypes.STRING
    },
    // 状态 1：启用 2：禁用
    status: {
      type: DataTypes.INTEGER(1),
      defaultValue: 1
    },
    decription: {
      type: DataTypes.STRING(50),
    }
  },
  {
    timestamps: false,
    tableName: 'category'
  }
)

// 模型同步
CategorySchema.sync()

export default CategorySchema