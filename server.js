import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/claude', async (req, res) => {
  const ANTHROPIC_API_KEY = process.env.VITE_ANTHROPIC_API_KEY;
  
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { messages, system } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: system || undefined,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', response.status, error);
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Claude proxy server running on http://localhost:${PORT}`);
});
