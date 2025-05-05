const cron = require('node-cron');
const Post = require('../models/Post'); 
const SocialMediaService = require('../services/SocialMediaService');
const getNextRunAt = require('../utils');
const { generateText } = require('../services/aiService');

cron.schedule('* * * * *', async () => {
  console.log('Checking for scheduled and recurring posts...');
  const now = new Date();

  try {
    const posts = await Post.find({
      status: { $in: ['scheduled'] },
      // status: { $in: ['scheduled', 'failed'] },
      $or: [
        { scheduledAt: { $lte: now } },
        { nextRunAt: { $lte: now } }
      ]
    });

    for (const post of posts) {
      try {
        if (post.prompt && post.aiGenerated) {
          try {
            const generated = await generateText(post.prompt, 'openai'); // or 'claude'
            post.content = generated;
            console.log(`Generated content for post ${post._id} using AI.`);
          } catch (aiErr) {
            post.status = 'failed';
            post.errorMessage = `AI generation failed: ${aiErr.message}`;
            await post.save();
            console.error(`AI generation failed for post ${post._id}:`, aiErr.message);
            continue; // Skip publishing if content couldn't be generated
          }
        }
        const result = await SocialMediaService.publishPost(post);
        const hasSuccess = result.some(r => r.status === 'success');

        // Log results
        console.log('r', result);

        // Update post status and timestamps
        post.status = hasSuccess ? 'posted' : 'failed';
        post.postedAt = new Date();
        post.errorMessage = hasSuccess ? null : JSON.stringify(result);

        // Handle recurrence
        if (post.recurrence !== 'none') {
          post.nextRunAt = getNextRunAt(post.nextRunAt || post.scheduledAt, post.recurrence);
        } else {
          post.status = 'completed';
        }

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



