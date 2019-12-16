// const fs = require('fs');
const axios = require("axios");

let addCube = async (username, cube) => {
    try {        
//       return (await axios.post("https://cubie.now.sh/api/add-cube-init", {
//           username,
//           cube
//       })).data
    } catch (err) {
        return {
            result: false,
            error: err.message
        }
    }
}

const wsOnPush = async (username, gitToken) => {
//     const cube = JSON.parse(fs.readFileSync(process.env.cube, 'utf8')).commits[0].message.split(".")[0];
//     const userInfo = JSON.parse(fs.readFileSync(`.cubie/cube.json`, 'utf8')).user;
    console.log(username, gitToken)
    return true
//     return await addCube(userInfo.username, cube)
}

wsOnPush(process.argv[2], process.argv[3]).then((res) => {
    console.log(res)
})
