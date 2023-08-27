import crypto, { createHmac } from 'crypto'

class CryptoClass {
    constructor() { }

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
        });
        return { publicKey, privateKey };
    }

    /**
     * 
     * @param {*} data 需要加密的密码
     * @returns 加密之后的密码
     */
    getHmacHash(string) {
        const secretKey = 'ltadpole_password'
        const hmac = createHmac('sha256', secretKey);
        hmac.update(string);
        return hmac.digest('hex')
    }
}

export default new CryptoClass