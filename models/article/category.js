'use strict'

import { DataTypes } from 'sequelize'
import sequelize from '../../mysql/db'
import ArticleSchema from './index'
import CategorySchema from '../category'

const ArticleCategory = sequelize.define(
    'articleCategory',
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
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: CategorySchema,
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        tableName: 'articleCategory'
    }
)

ArticleSchema.belongsToMany(CategorySchema, {
    through: {
        model: ArticleCategory,
        unique: false // 取消联合主键的约定
    },
    as: 'category',
    foreignKey: 'articleId',
    constraints: false
})
CategorySchema.belongsToMany(ArticleSchema, {
    through: {
        model: ArticleCategory,
        unique: false
    },
    as: 'article',
    foreignKey: 'categoryId',
    constraints: false
})

ArticleCategory.sync()

export default ArticleCategory