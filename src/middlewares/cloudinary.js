const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'social-media-posts',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4'],
    resource_type: (req, file) => {
      const ext = file.mimetype.split('/')[0];
      return ext === 'video' ? 'video' : 'image';
    }
  }
});

// Optional: File filter for additional validation (if needed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'video/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images and MP4 videos are allowed'), false);
  }
};

// Multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // Optional: 50MB limit
});

module.exports = upload;
