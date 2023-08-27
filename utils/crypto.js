import crypto, { createHash, createHmac } from 'crypto'

class CryptoClass {
  // constructor() { }

  /**
     * 生成公钥私钥
     * @returns  publicKey: 公钥;privateKey: 私钥
     */
  genRSAKeyPaire() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    })
    return { publicKey, privateKey }
  }

  /**
     * sha256加密
     * @param {*} data 需要加密的密码
     * @returns 加密之后的密码
     */
  getHmacHash(string) {
    const secretKey = 'ltadpole_password'
    const hmac = createHmac('sha256', secretKey)
    hmac.update(string)
    return hmac.digest('hex')
  }

  /**
     * MD5加密
     * @param {*} string 需要加密的字段
     */
  getMD5Hash(string) {
    const md5 = createHash('md5')
    md5.update(string)
    return md5.digest('hex')
  }
}

export default new CryptoClass