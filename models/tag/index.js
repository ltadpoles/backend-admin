'use strict'

import { DataTypes } from 'sequelize'
import sequelize from '../../mysql/db'

const TagSchema = sequelize.define(
    'tag',
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
        create_time: {
            type: DataTypes.BIGINT,
            allowNull: false
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
        tableName: 'tag'
    }
)

// 模型同步
TagSchema.sync()

export default TagSchema