const Post = require('../models/Post');


exports.getPosts = async (req, res) => {
  const posts = await Post.find({ projectId: req.query.projectId });
  res.json(posts);
};

// const postQueue = require('../jobs/postScheduler');

// exports.createPost = async (req, res) => {
//   const post = await Post.create({ ...req.body, userId: req.user._id });
//   res.json(post);
// };

exports.createPost = async (req, res) => {
  try {
    // const mediaUrls = [];

    // if (req.files && req.files.length > 0) {
    //   req.files.forEach(file => {
    //     mediaUrls.push(`/uploads/${file.filename}`); // or full URL if hosted
    //   });
    // }

    const post = await Post.create({
      ...req.body,
      // userId: req.user._id,
      // mediaUrls
    });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};
