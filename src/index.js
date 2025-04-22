
// src/index.js
require('dotenv').config();
// require('./jobs/postProcessor'); // start background worker
// const { createBullBoard } = require('bull-board');
// const { BullMQAdapter } = require('bull-board/bullMQAdapter');
// const postQueue = require('./jobs/postScheduler');

// const { router } = createBullBoard([
//   new BullMQAdapter(postQueue),
// ]);
require('./jobs/cron');
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

// app.use('/admin/queues', router);
// app.use('/api/post-logs', require('./routes/postLogs'));


// // utils
app.use('/api/v1/media', require('./routes/media'));
app.use('/api/v1/ai', require('./routes/ai'));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/projects', require('./routes/projects'));
app.use('/api/v1/social-accounts', require('./routes/socialAccounts'));
app.use('/api/v1/posts', require('./routes/posts'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
