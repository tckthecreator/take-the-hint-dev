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

/**WHEN THE MENTION EVENT IS TRIGGER*/  
mentions.on('tweet', (tweet) => {

    /*VERIFY IF THE TWEET IS REPLYING SOMEONE. IF NOT, RETURN NOTHING*/
    if (tweet.in_reply_to_status_id_str === null) return;

    T.post('favorites/create', { id: tweet.id_str });
    T.post('favorites/create', { id: tweet.in_reply_to_status_id_str });

    T.post('friendships/create', { screen_name: tweet.in_reply_to_screen_name});
  
    T.post('statuses/update', { status: `From: @${tweet.in_reply_to_screen_name
        }`, attachment_url: `https://twitter.com/${tweet.in_reply_to_screen_name}/status/${tweet.in_reply_to_status_id_str}` 
    });
});

