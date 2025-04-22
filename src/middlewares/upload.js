const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'social-media-posts',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4']
  }
});

const upload = multer({ storage });

module.exports = upload;
