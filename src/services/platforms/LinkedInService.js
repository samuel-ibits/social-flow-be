const axios = require('axios');

const LinkedInService = {
  async publish(post, account) {
    const accessToken = account.accessToken;
    const orgUrn = account.accountId; // format: urn:li:organization:123456
    const message = post.content;
    const header ={		
      'LinkedIn-Version': '202210',
      'X-Restli-Protocol-Version': '2.0.0',
      'Authorization': `Bearer ${accessToken}`,
      // 'Content-Type': 'application/json'
  }
  const body=  JSON.stringify({
    "author": "urn:li:person:___user_identifier___",
    "commentary": message,
    "visibility": {'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'},
    "distribution": {
        "feedDistribution": "MAIN_FEED",
        "targetEntities": [],
        "thirdPartyDistributionChannels": []
    },
    "lifecycleState": "PUBLISHED",
});
  

    const url = 'https://api.linkedin.com/rest/post';

    const res = await axios.post(url, body, {
      headers: header
    });
    
    return res.data;
  }
};

module.exports = LinkedInService;
