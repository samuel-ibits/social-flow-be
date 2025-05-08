const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/postController');
const upload = require('../middlewares/upload');

router.use(auth);
router.post('/', controller.createPost);
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
    res.status(200).json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: req.file.path
    });
  });

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
  