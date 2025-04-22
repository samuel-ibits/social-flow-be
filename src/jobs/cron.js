const cron = require('node-cron');
const Post = require('../models/Post'); 
const SocialMediaService = require('../services/SocialMediaService');

cron.schedule('* * * * *', async () => {
  console.log('Checking for scheduled posts...');

  const now = new Date();

  try {
    const posts = await Post.find({
        status: 'scheduled',
      // status: { $in: ['scheduled', 'failed'] },
      scheduledAt: { $lte: now }
    });

    for (const post of posts) {
        try {
            // Publish post to all connected social platforms
            const result = await SocialMediaService.publishPost(post);
    console.log('r',result);
            // Optionally, check if at least one platform succeeded
            const hasSuccess = result.some(r => r.status === 'success');
    
            post.status = hasSuccess ? 'posted' : 'failed';
            post.postedAt = new Date();
            post.errorMessage = hasSuccess ? null : JSON.stringify(result);
            await post.save();
    
            console.log(`Post ${post._id} processed. Status: ${post.status}`);
          } catch (err) {
            post.status = 'failed';
            post.errorMessage = err.message;
            await post.save();
    
            console.error(`Failed to publish post ${post._id}:`, err.message);
          }
        }
      } catch (err) {
        console.error('Cron job error:', err);
      }
});
