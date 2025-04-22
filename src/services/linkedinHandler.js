const axios = require('axios');
const postLogService = require('./postLogService');

/**
 * Publish a post to LinkedIn and log the result.
 * @param {Object} post - The post object
 * @param {String} post.message - The content of the post
 * @param {String} post.imageUrl - The image URL (if any)
 * @param {String} userToken - The access token for the user
 * @param {ObjectId} postId - The ID of the post to log
 * @returns {Promise} - Resolves to the response from LinkedIn or an error
 */
exports.publishPost = async (post, userToken, postId) => {
  try {
    const response = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: `urn:li:person:${userToken}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          com.linkedin.ugc.ShareContent: {
            shareCommentary: {
              text: post.message
            },
            shareMediaCategory: 'IMAGE',
            media: [{
              status: 'READY',
              media: post.imageUrl
            }]
          }
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'X-RestLi-Protocol-Version': '2.0.0'
        }
      }
    );
    
    // Log success
    await postLogService.createPostLog(postId, 'success', response.data, 'linkedin');
    return response.data;
  } catch (error) {
    // Log failure
    await postLogService.createPostLog(postId, 'failure', error.message, 'linkedin');
    throw error; // Rethrow error for further handling
  }
};
