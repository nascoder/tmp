const crypto = require('crypto');
// const axios = require("axios");

async function decrypt(content, pass) {
    console.log("Decrypting content...");

    const algorithm = 'aes256';

    try {
        // let resp = axios.get(
        //     `https://api.github.com/repos/${repo}/contents/auth.enc`
        // )
        // let cnt = resp.data.content
        // let content = Buffer.from(cnt, 'base64').toString('ascii').replace(/\n/g, "");

        var decipher = crypto.createDecipher(algorithm, pass)
        var dec = decipher.update(content, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec
    } catch (err) {
        throw err
    }
}

const a = async (content, gitToken) => {
    return await decrypt(content, gitToken)
}

a(process.argv[2], process.argv[3]).then((res) => {
    console.log(res)
})