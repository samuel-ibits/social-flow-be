const mongoose = require('mongoose');

const socialAccountSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  platform: { type: String, enum: ['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok', 'youtube'], required: true },
  accountName: String,
  accessToken: String,
  bearerToken: String,
  refreshToken: String,
  expiresAt: Date,
  connectedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SocialAccount', socialAccountSchema);
