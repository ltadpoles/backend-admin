const POOL = {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
}

export const CONFIG = {
    host: 'localhost',
    dialect: 'mysql',
    pool: POOL
}

export const PORT = process.env.PORT || '4000'