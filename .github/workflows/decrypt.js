const crypto = require('crypto');
const axios = require("axios");

async function decrypt(repo, pass) {
    console.log("Decrypting content...");

    const algorithm = 'aes256';

    try {
        let resp = await axios.get(
            `https://api.github.com/repos/${repo}/contents/auth.enc`
        )
        let cnt = resp.data.content
        let content = Buffer.from(cnt, 'base64').toString('ascii').replace(/\n/g, "");

        console.log(content)
        var decipher = crypto.createDecipher(algorithm, pass)
        var dec = decipher.update(content, 'hex', 'utf8')
        dec += decipher.final('utf8');
        console.log(dec)
        return true
    } catch (err) {
        throw err
    }
}

const a = async (repo, gitToken) => {
    return await decrypt(repo, gitToken)
}

a(process.argv[2], process.argv[3]).then((res) => {
    console.log(res)
})