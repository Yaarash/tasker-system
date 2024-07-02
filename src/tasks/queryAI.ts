import axios from 'axios';

const AI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const queryAI = async (parameters: { prompt: string }): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': apiKey,
  };
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: parameters.prompt }],
  };

  try {
    const response = await axios.post(AI_API_URL, data, { headers });
    if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message?.content.trim();
    } else {
        return 'null';
    }
  } catch (error) {
    console.error('Error querying OpenAI:');
    throw error;
  }
};