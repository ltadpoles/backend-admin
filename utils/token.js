import jsonwebtoken from 'jsonwebtoken'
import { CONFIG } from '../config'

// 创建token
export const createToken = (data = {}) => {
  data.iat = new Date().getTime() // token 创建时间
  const token = jsonwebtoken.sign(data, CONFIG.SECRETKEY, { expiresIn: 1000 * 60 * 60 })
  return token
}