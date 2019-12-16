const axios = require("axios");

let checkAuth = async (username, repo, gitToken, branch) => {
    try {
        return (await axios.post("https://88a4fa7d.ngrok.io/api/check-auth", {
            username,
            gitToken,
            repo,
            path: `auth.enc?ref=${branch}`
        })).data
    } catch (err) {
        return {
            result: false,
            error: err.message
        }
    }
}

const onEncrypt = async (repo, gitToken, branch) => {
    let username = repo.split('/')[0];
    repo = repo.split('/')[1];

    return await checkAuth(username, repo, gitToken, branch)
}

onEncrypt(process.argv[2], process.argv[3], process.argv[4]).then((res) => {
    console.log(res)
})