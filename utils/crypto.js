const crypto = require('crypto')
const fs = require('fs')

/**
 * 生成RSA公私钥对
 * @return {*} publicKey: 公钥;privateKey: 私钥
 */
function genRSAKeyPaire() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
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

function writeCryptoFile() {
    fs.writeFile('./crypto.txt', JSON.stringify(genRSAKeyPaire()), (err, res) => {
        if (err) {
            console.log('密钥对生成失败')
        }

        console.log('密钥对生成成功')
    })
}

writeCryptoFile()