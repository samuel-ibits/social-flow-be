const axios = require('axios');
const postLogService = require('./postLogService');

/**
 * Publish a post to Facebook and log the result.
 * @param {Object} post - The post object
 * @param {String} post.message - The content of the post
 * @param {String} post.imageUrl - The image URL (if any)
 * @param {String} userToken - The access token for the user
 * @param {ObjectId} postId - The ID of the post to log
 * @returns {Promise} - Resolves to the response from Facebook or an error
 */
exports.publishPost = async (post, userToken, postId) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v11.0/me/feed`,
      {
        message: post.message,
        picture: post.imageUrl,
        access_token: userToken
      }
    );
    
    // Log success
    await postLogService.createPostLog(postId, 'success', response.data, 'facebook');
    return response.data;
  } catch (error) {
    // Log failure
    await postLogService.createPostLog(postId, 'failure', error.message, 'facebook');
    throw error; // Rethrow error for further handling
  }
};
