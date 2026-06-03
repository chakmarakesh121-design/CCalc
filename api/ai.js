export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body || {};
  if (!question) {
    return res.status(400).json({ error: 'Missing question field.' });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return res.status(200).json({
      answer: 'AI backend is not configured. Set OPENAI_API_KEY in Vercel environment variables or a local .env file.'
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
    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
