const POOL = {
  max: 5,
  min: 0,
  acquire: 3000,
  idle: 10000
}

export const DBINIT = {
  host: 'localhost',
  dialect: 'mysql',
  pool: POOL
}

export const CONFIG = {
  PORT: process.env.port || '3000',
  PUBLICPATH: '/api' // 不需要验证 token 的接口
}