import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '@/lib/ai-context';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    });

    const textContent = response.content.find(block => block.type === 'text');
    const text = textContent && textContent.type === 'text' ? textContent.text : '';

    return Response.json({ message: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}
