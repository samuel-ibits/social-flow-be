const axios = require('axios');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// TEXT: Generate caption/content
exports.generateText = async (prompt, provider = 'openai') => {
  if (provider === 'openai') {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    });
    return completion.choices[0].message.content.trim();
  }

  if (provider === 'claude') {
    const res = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-opus-20240229',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data.content[0].text.trim();
  }

  throw new Error('Unsupported provider');
};

// IMAGE: Generate via DALL·E
exports.generateImage = async (prompt) => {
  const response = await openai.images.generate({
    prompt,
    n: 1,
    size: '1024x1024'
  });

  return response.data[0].url;
};
