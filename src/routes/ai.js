const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const auth = require('../middlewares/auth');

// Generate text content
router.post('/generate-text', auth, async (req, res) => {
  const { prompt, provider } = req.body;
  try {
    const content = await aiService.generateText(prompt, provider);
    res.json({ content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Generate image
router.post('/generate-image', auth, async (req, res) => {
  const { prompt } = req.body;
  try {
    const imageUrl = await aiService.generateImage(prompt);
    res.json({ imageUrl });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;

// POST /api/ai/generate-text
// {
//   "prompt": "Write a social media post about eco-friendly fashion trends.",
//   "provider": "openai"
// }
