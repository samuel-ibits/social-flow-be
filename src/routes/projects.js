
// src/routes/projects.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/auth');

router.use(auth);
router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);

module.exports = router;
