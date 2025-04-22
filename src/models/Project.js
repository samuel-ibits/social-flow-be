
// src/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    industry: String,
    timezone: String,
    logoUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
  });
  
  module.exports = mongoose.model('Project', projectSchema);
  