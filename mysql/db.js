'use strict'

import { Sequelize } from 'sequelize'
import { DBINIT } from '../config'

const sequelize = new Sequelize('backend_admin', 'root', '123456', DBINIT)

try {
    sequelize.authenticate();
    console.log('数据库连接成功');
} catch (error) {
    console.error('数据库连接失败:', error);
}

export default sequelize