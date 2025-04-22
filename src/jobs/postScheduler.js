const { Queue } = require('bullmq');
const redis = require('../config/redis');

const postQueue = new Queue('postQueue', { connection: {
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD, 
    host: '127.0.0.1', // Redis server address
    port: 6379, // Add password for authentication
  } });

module.exports = postQueue;
