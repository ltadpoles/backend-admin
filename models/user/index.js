'use strict'

import { DataTypes } from 'sequelize'
// import { USER } from '../../initData'
import sequelize from '../../mysql/db'

const UserSchema = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true,
      allowNull: false //不允许为null
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
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
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    },
    state: {
      // 权限：0：超级管理员 1：普通管理员 2: 用户
      type: DataTypes.INTEGER(1),
      defaultValue: 2,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.INTEGER(1),
    },
    phone: {
      type: DataTypes.STRING(11),
    },
    email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(50),
    }
  },
  {
    timestamps: false,
    tableName: 'user'
  }
)

// 模型同步
UserSchema.sync()

export default UserSchema