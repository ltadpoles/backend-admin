'use strict'

import { Sequelize } from 'sequelize'
import { CONFIG } from '../config'

const sequelize = new Sequelize('node_sql', 'root', '123456', CONFIG)

try {
    sequelize.authenticate();
    console.log('数据库连接成功');
} catch (error) {
    console.error('数据库连接失败:', error);
}

export default sequelize