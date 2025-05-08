
// src/index.js
require('dotenv').config();

require('./jobs/cron');
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

// app.use('/api/v1', require('./utils/file_uploader'));

// // utils
app.use('/api/v1/media', require('./routes/media'));
app.use('/api/v1/ai', require('./routes/ai'));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/projects', require('./routes/projects'));
app.use('/api/v1/social-accounts', require('./routes/socialAccounts'));
app.use('/api/v1/posts', require('./routes/posts'));

//make files in public folder accessible
app.use('/files', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
