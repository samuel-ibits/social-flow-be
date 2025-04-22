const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  content: String,
  mediaUrls: [String],
  platforms: [{ type: String, enum: ['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok', 'youtube'] }],
  status: { type: String, enum: ['draft', 'scheduled', 'posted', 'failed'], default: 'draft' },
  scheduledAt: Date,
  postedAt: Date,
  errorMessage: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
