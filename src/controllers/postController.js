const Post = require('../models/Post');


exports.getPosts = async (req, res) => {
  const posts = await Post.find({ projectId: req.query.projectId });
  res.json(posts);
};

// const postQueue = require('../jobs/postScheduler');

exports.createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, userId: req.user._id });

  // if (post.scheduledAt) {
  //   await postQueue.add('publish', { postId: post._id }, {
  //     delay: new Date(post.scheduledAt) - new Date(),
  //     jobId: `post-${post._id}`
  //   });
  // }

  res.json(post);
};
