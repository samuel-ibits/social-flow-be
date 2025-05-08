const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads');
const auth = require('../middlewares/auth');

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Upload failed' });
  }

  res.json({
    url: req.file.path,
    public_id: req.file.filename
  });   
});

module.exports = router;
