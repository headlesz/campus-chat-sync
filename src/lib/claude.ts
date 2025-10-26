type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export async function chatWithClaude(
  messages: Message[],
  systemPrompt?: string
): Promise<string> {
  try {
    const response = await fetch('http://localhost:3001/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude proxy error:', response.status, errorText);
      return '';
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    return text.trim();
  } catch (error) {
    console.error('Claude request failed:', error);
    return '';
  }
}
