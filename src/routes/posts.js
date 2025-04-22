const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/postController');

router.use(auth);
router.post('/', controller.createPost);
router.get('/', controller.getPosts);

module.exports = router;

// {
//     "projectId": "64f000c1...",
//     "content": "Exciting updates coming soon!",
//     "mediaUrls": ["https://cdn.mycdn.com/image.jpg"],
//     "platforms": ["twitter", "linkedin"],
//     "status": "scheduled",
//     "scheduledAt": "2025-04-10T10:00:00.000Z"
//   }
  