const crypto = require('crypto');
const shell = require("shelljs")

async function encrypt(owner, repo, pass, branch) {
    const algorithm = 'aes256';
    try {
        var cipher = crypto.createCipher(algorithm, pass)
        var crypted = cipher.update("unclecode", 'utf8', 'hex')
        crypted += cipher.final('hex');
        
        shell.exec(`git branch`)
        shell.exec(`ls`)

        // shell.exec(`echo ${crypted} > auth.enc`)
        
        // shell.exec(`git add auth.enc`)
        // shell.exec(`git commit -m 'add auth file'`)
        // shell.exec(`git push https://${ owner }:${ pass }@github.com/${ repo } `)

        // (await axios.post("https://88a4fa7d.ngrok.io/api/check-auth", {
        //     owner,
        //     pass,
        //     repo,
        //     path: `auth.enc?ref=${branch}`
        // })).data

        // return crypted
        return true
    } catch (err) {
        throw err
    }
}

const a = async (repo, gitToken, branch) => {
    let owner = repo.split('/')[0]
    repo = repo.split('/')[1]
    return await encrypt(owner, repo, gitToken, branch)
}

a(process.argv[2], process.argv[3], process.argv[4]).then((res) => {
    console.log(res)
})