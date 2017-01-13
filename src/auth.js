const fs = require('fs');
const path = require('path');
const hmAPI = require('./hmAPI.js');
const config = require('./config/config.json');

const PATH_TO_TOKEN_FILE = path.join(__dirname, './config/token.txt');

module.exports = {
  getToken: () => {
    if (fs.existsSync(PATH_TO_TOKEN_FILE)) {
      const token = fs.readFileSync(PATH_TO_TOKEN_FILE, 'utf8');
      console.log("Use already existed token", token);
      return Promise.resolve(token);
    } else {
      return hmAPI.auth(config).then(token => {
        console.log("Get new token", token);
        fs.writeFileSync(PATH_TO_TOKEN_FILE, token, { flag: 'wx' });
        return token;
      });
    }
  }
};