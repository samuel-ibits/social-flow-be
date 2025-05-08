const axios = require('axios');
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  // appKey: process.env.TWITTER_API_KEY,
  // appSecret: process.env.TWITTER_API_SECRET_KEY,
  // accessToken: process.env.TWITTER_ACCESS_TOKEN,
  // accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  
});

const TwitterService = {

  async publish(post, account) {
    console.log('Connecting to Twitter');

    // const accessToken = account.accessToken;
    // const bearerToken = account.bearerToken;


    // const payload = {
    //   card_uri: '<string>', // Replace with actual if needed
    //   community_id: '1146654567674912769',
    //   direct_message_deep_link: '<string>', // Replace with actual if needed
    //   for_super_followers_only: false,
    //   geo: {
    //     place_id: '<string>' // Replace with actual if needed
    //   },
    //   media: {
    //     media_ids: ['1146654567674912769'], // Replace with post.mediaIds if dynamic
    //     tagged_user_ids: ['2244994945']
    //   },
    //   nullcast: false,
    //   poll: {
    //     duration_minutes: 5042,
    //     options: ['<string>'], // Replace with real poll options if you have any
    //     reply_settings: 'following'
    //   },
    //   quote_tweet_id: '1346889436626259968',
    //   reply: {
    //     exclude_reply_user_ids: ['2244994945'],
    //     in_reply_to_tweet_id: '1346889436626259968'
    //   },
    //   reply_settings: 'following',
    //   text: post.content
    // };

    try {
 // Ensure post.mediaUrls exists and is an array
  const mediaIds = await Promise.all(
    post.mediaUrls.map(async (url) => {
      try {
        const absolutePath = path.resolve(url); // Use full path if url is relative
        const mediaData = fs.readFileSync(absolutePath);
        
        // You can auto-detect or specify type based on file extension
        const ext = path.extname(url).substring(1); // e.g., 'jpg'
        const mediaId = await client.v1.uploadMedia(mediaData, { type: ext });
        return mediaId;
      } catch (err) {
        console.error(`Error uploading media: ${url}`, err.message);
        return null; // or throw if you want to stop on error
      }
    })
  );

// Filter out failed uploads (nulls)
const validMediaIds = mediaIds.filter(Boolean);

      const res = await client.v2.tweet(post.content, {
        media: {
          media_ids: validMediaIds,
        },
      });

      // const res = await axios.post('https://api.twitter.com/2/tweets', payload, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      console.log('sucessful',res);
      return res;
    } catch (error) {
      console.error('Twitter API error:', error?.response?.data || error.message);
      throw error;
    }
  }
};

module.exports = TwitterService;
