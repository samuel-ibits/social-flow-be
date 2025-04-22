const { Redis } = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD, 
  // host: '127.0.0.1', // Redis server address
  port: 6379, // Add password for authentication
});
module.exports = redis;


// const { createClient } = require('redis');

// const client = createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// const redis= client.connect();
// module.exports = redis;


// // Define Redis connection details
// const redisConfig = {
//   host: '127.0.0.1', // Redis server address
//   port: 6379,        // Redis server port
//   // You can add more Redis connection options here if needed
// };