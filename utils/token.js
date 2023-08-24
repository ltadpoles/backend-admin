import jsonwebtoken from 'jsonwebtoken'
import { CONFIG } from '../config'

export const createToken = (data = {}) => {
  data.iat = new Date().getTime() // token 创建时间
  const token = jsonwebtoken.sign(data, CONFIG.SECRETKEY, { expiresIn: '1h' })
  return token
}