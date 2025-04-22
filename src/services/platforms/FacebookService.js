const axios = require('axios');

const FacebookService = {
  async publish(post, account) {
    const pageId = account.accountId; // Facebook Page ID
    const token = account.accessToken;
    const message = post.content;

    const url = `https://graph.facebook.com/${pageId}/feed`;

    const res = await axios.post(url, {
      message
    }, {
      params: { access_token: token }
    });

    return res.data;
  }
};

module.exports = FacebookService;
