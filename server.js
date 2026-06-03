import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

app.post('/api/ai', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Missing question field.' });
  }

  if (!OPENAI_KEY) {
    return res.json({
      answer: 'AI backend is not configured. Set OPENAI_API_KEY in a .env file and restart the server to enable this feature.'
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are ContractorsCalc, a construction estimating assistant. Answer clearly and help users with calculators, material estimates, and construction planning questions.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 250,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const body = await response.text();
      return res.status(response.status).json({ error: body });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim() || 'I could not generate an answer at this time.';
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI backend running on http://localhost:${PORT}`);
});
