const fs = require('fs');
const axios = require("axios");

let addCube = async (username, cube) => {
    // call /add-cube for server
    try {        
          return (await axios.post("https://cubie.now.sh/api/add-cube-init", {
              username,
              cube
          })).data
        
    } catch (err) {
        return {
            result: false,
            error: err.message
        }
    }
}

const wsOnPush = async () => {
    const cube = JSON.parse(fs.readFileSync(process.env.cube, 'utf8')).commits[0].message.split(".")[0];
    const userInfo = JSON.parse(fs.readFileSync(`.cubie/cube.json`, 'utf8')).user;
    return await addCube(userInfo.username, cube)
}

wsOnPush().then((res) => {
    console.log(res)
})
