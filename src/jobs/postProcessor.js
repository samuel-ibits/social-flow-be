const { Worker } = require('bullmq');
const redis = require('../config/redis');

const Post = require('../models/Post'); // assumes you have a Post model
const SocialMediaService = require('../services/SocialMediaService'); // we'll create this later

const worker = new Worker('postQueue', async job => {
  const { postId } = job.data;
  const post = await Post.findById(postId).populate('projectId');
  if (!post) throw new Error('Post not found');

  // Send post to all connected social platforms
  await SocialMediaService.publishPost(post);
}, { connection: redis });

worker.on('completed', job => console.log(`✅ Post ${job.id} processed`));
worker.on('failed', (job, err) => console.error(`❌ Job ${job.id} failed:`, err));

module.exports = worker;
