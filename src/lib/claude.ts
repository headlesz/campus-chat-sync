type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export async function chatWithClaude(
  messages: Message[],
  systemPrompt?: string
): Promise<string> {
  try {
    console.log('🔵 Sending to Claude:', { messageCount: messages.length, hasSystem: !!systemPrompt });
    
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
      console.error('❌ Claude proxy error:', response.status, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Claude response:', data);
    
    const text = data.content?.[0]?.text || '';
    if (!text) {
      console.error('⚠️ Empty response from Claude:', data);
      throw new Error('Empty response from Claude');
    }
    
    console.log('💬 Claude says:', text);
    return text.trim();
  } catch (error) {
    console.error('❌ Claude request failed:', error);
    throw error;
  }
}
