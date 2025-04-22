const axios = require('axios');

const InstagramService = {
  async publish(post, account) {
    const igUserId = account.accountId; // Instagram Business User ID
    const accessToken = account.accessToken;
    const message = post.content;
    const imageUrl = post.imageUrl;

    // 1. Create a media container
    const mediaRes = await axios.post(
      `https://graph.facebook.com/v19.0/${igUserId}/media`,
      {
        image_url: imageUrl,
        caption: message
      },
      { params: { access_token: accessToken } }
    );

    const creationId = mediaRes.data.id;

    // 2. Publish the container
    const publishRes = await axios.post(
      `https://graph.facebook.com/v19.0/${igUserId}/media_publish`,
      { creation_id: creationId },
      { params: { access_token: accessToken } }
    );

    return publishRes.data;
  }
};

module.exports = InstagramService;
