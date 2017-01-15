const fs = require('fs');
const path = require('path');
const logger = require('./logger.js');
const hmAPI = require('./hmAPI.js');
const config = require('./config/config.json');

const PATH_TO_TOKEN_FILE = path.join(__dirname, './config/token.txt');

module.exports = {
  getToken: () => {
    if (fs.existsSync(PATH_TO_TOKEN_FILE)) {
      const token = fs.readFileSync(PATH_TO_TOKEN_FILE, 'utf8');
      logger.info(`Use already existed token ${token}`);
      return Promise.resolve(token);
    } else {
      return hmAPI.auth(config).then(token => {
        logger.info(`Get new token ${token}`);
        fs.writeFileSync(PATH_TO_TOKEN_FILE, token, { flag: 'wx' });
        return token;
      });
    }
  }
};