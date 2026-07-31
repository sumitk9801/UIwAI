import 'dotenv/config';
import axios from 'axios';

const prompt = 'Test component';
const messages = [
  { role: 'system', content: 'You are a React component generator. Output ONLY a valid JSON object.' },
  { role: 'user', content: prompt }
];

try {
  const r = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    },
    {
      headers: {
        Authorization: 'Bearer ' + process.env.OPENROUTER_APIKEY,
        'Content-Type': 'application/json'
      }
    }
  );
  console.log(JSON.stringify(r.data, null, 2));
} catch (e) {
  console.error('ERR', e.response?.data || e.message);
  process.exit(1);
}
