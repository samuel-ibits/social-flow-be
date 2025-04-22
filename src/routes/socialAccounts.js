const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/socialAccountController');

router.use(auth);
router.post('/', controller.connectAccount);
router.get('/', controller.getAccounts);

module.exports = router;

// {
//     "projectId": "64f000c1...",
//     "platform": "twitter",
//     "accountName": "@myhandle",
//     "accessToken": "abc123",
//     "refreshToken": "refresh123",
//     "expiresAt": "2025-06-30T00:00:00.000Z"
//   }
  