const Twitter = require('twitter');
const config = require('./config/config.json');

const client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret,
});

module.exports = {
  sendMessage: text => {
    config.twitter.users.forEach(userId => {
      client.post('direct_messages/new', {
        'screen_name': userId,
        'text': text,
      }, (error, tweets, response) => {
        if (error) {
          console.log('error', error);
          return;
        }
        console.log('tweets', tweets);
      });
    });
  }
};

