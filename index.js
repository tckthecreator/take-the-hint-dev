require('dotenv').config()
const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY, 
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/*LISTEN TO TWEETS IN REAL TIME WITH @BOT_TAKETHEHINT MENTIONS*/
const mentions = T.stream('statuses/filter', { track: '@bot_takethehint' });

mentions.on('tweet', (tweet) => {
    /*VERIFY IF THE TWEET IS REPLYING SOMEONE. IF NOT, RETURN NOTHING*/
    if (tweet.in_reply_to_status_id_str === null) return;

    T.post('statuses/update', { status: `Autor: @${tweet.in_reply_to_screen_name}, 
Visto por: @${tweet.user.screen_name}`, 
        attachment_url: `https://twitter.com/bot_takethehint/status/${tweet.in_reply_to_status_id_str}` 
    });
});