const Project = require('../models/Project');
const SocialAccount = require('../models/SocialAccount');
const TwitterService = require('./platforms/TwitterService');
const FacebookService = require('./platforms/FacebookService');
const LinkedInService = require('./platforms/LinkedInService');
const InstagramService = require('./platforms/InstagramService');


const SocialMediaService = {
  async publishPost(post) {
    const project = await Project.findById(post.projectId);
    const accounts = await SocialAccount.find({ projectId: project._id });

if (!accounts.length) {
  throw new Error('No connected social media accounts found. Please add at least one.');
}

console.log('accounts', accounts);


    const results = [];

    for (const account of accounts) {
      try {
        let response;
      // inside the switch-case:
        switch (account.platform) {
            case 'twitter':
            response = await TwitterService.publish(post, account);
            break;
            case 'facebook':
            response = await FacebookService.publish(post, account);
            break;
            case 'linkedin':
            response = await LinkedInService.publish(post, account);
            break;
            case 'instagram':
            response = await InstagramService.publish(post, account);
            break;
            default:
            throw new Error(`Unsupported platform: ${account.platform}`);
        }
        

        results.push({ platform: account.platform, status: 'success', response });
      } catch (error) {
        results.push({ platform: account.platform, status: 'error', error: error.message });
        console.error(`[Error posting to ${account.platform}]`, error);
      }
    }

    return results;
  }
};

module.exports = SocialMediaService;
