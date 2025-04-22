const express = require('express');
const router = express.Router();
const PostLog = require('../models/PostLog');
const auth = require('../middlewares/auth');

/**
 * Fetch all logs related to a specific post
 * @param {ObjectId} postId - The post ID for which we want to retrieve logs
 */
router.get('/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  
  try {
    const logs = await PostLog.find({ postId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
