const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  content: String,
  prompt: String,
  aiGenerated: { type: Boolean, default: false },
  mediaUrls: [String],
  platforms: [
    { type: String, enum: ['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok', 'youtube'] }
  ],
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'posted', 'failed', 'completed'],
    default: 'draft'
  },
  scheduledAt: Date,
  postedAt: Date,
  nextRunAt: Date, // For recurring scheduling
  recurrence: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly'],
    default: 'none'
  },
  errorMessage: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
