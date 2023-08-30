'use strict'

import { DataTypes } from 'sequelize'
import sequelize from '../../mysql/db'
import ArticleSchema from './index'
import TagSchema from '../tag'

const ArticleTag = sequelize.define(
    'articletag',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // 主键
            autoIncrement: true,
            allowNull: false //不允许为null
        },
        articleId: {
            type: DataTypes.INTEGER,
            references: {
                model: ArticleSchema,
                key: 'id'
            }
        },
        tagId: {
            type: DataTypes.INTEGER,
            references: {
                model: TagSchema,
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        tableName: 'articletag'
    }
)

ArticleSchema.belongsToMany(TagSchema, {
    through: {
        model: ArticleTag,
        unique: false // 取消联合主键的约定
    },
    as: 'tag',
    foreignKey: 'articleId',
    constraints: false
})
TagSchema.belongsToMany(ArticleSchema, {
    through: {
        model: ArticleTag,
        unique: false
    },
    as: 'article',
    foreignKey: 'tagId',
    constraints: false
})

ArticleTag.sync()

export default ArticleTag