const PostLog = require('../models/PostLog');

/**
 * Create a new log entry for a post.
 * @param {ObjectId} postId - The post ID this log is related to
 * @param {String} status - The status of the post ('success' or 'failure')
 * @param {String} message - The success or failure message
 * @param {String} platform - The platform where the post was attempted (e.g., Facebook, Instagram)
 * @returns {Promise} - Resolves to the created log entry
 */
exports.createPostLog = async (postId, status, message, platform) => {
  const log = new PostLog({
    postId,
    status,
    message,
    platform
  });
  
  await log.save();
  return log;
};
