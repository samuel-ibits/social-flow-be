const mongoose = require('mongoose');

const postLogSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  platform: String,
  status: String,
  response: Object,
  message: String,
  error: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PostLog', postLogSchema);
