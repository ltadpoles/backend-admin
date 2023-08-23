'use strict'

import { DataTypes } from 'sequelize'
// import { USER } from '../../initData'
import sequelize from '../../mysql/db'

const AdminSchema = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // 主键
            autoIncrement: true,
            allowNull: false //不允许为null
        },
        user_id: {
            type: DataTypes.STRING,
            // defaultValue: USER.user_id,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(10),
            // defaultValue: USER.username,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            // defaultValue: USER.password,
            allowNull: false
        },
        create_time: {
            type: DataTypes.BIGINT,
            // defaultValue: USER.create_time,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        state: {
            // 权限：0：超级管理员 1：普通管理员
            type: DataTypes.INTEGER(1),
            // defaultValue: USER.state,
            allowNull: false
        },
        nick_name: {
            type: DataTypes.STRING,
            // defaultValue: USER.nick_name
        },
        sex: {
            type: DataTypes.INTEGER(1),
            // defaultValue: USER.sex
        },
        phone: {
            type: DataTypes.STRING(11),
            // defaultValue: USER.phone
        },
        email: {
            type: DataTypes.STRING,
            // defaultValue: USER.email
        },
        address: {
            type: DataTypes.STRING,
            // defaultValue: USER.address
        },
        dec: {
            type: DataTypes.STRING(50),
            // defaultValue: USER.dec
        }
    },
    {
        timestamps: false,
        tableName: 'user'
    }
)

// 模型同步
AdminSchema.sync()

export default AdminSchema