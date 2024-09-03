import axios from 'axios';

// TODO: Move to settings in foundry
const OPENAI_API_KEY =
  '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateSPCContent(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const message = response.data.choices[0].message.content;
    return message;
  } catch (error) {
    console.error('Error generating SPC content:', error);
    throw new Error('Failed to generate content');
  }
}
