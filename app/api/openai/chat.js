// pages/api/chat.js

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,  // Store your API key in environment variables
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { branchId, query } = req.body;  // Example input: branch-specific query

    try {
        const response = await openai.createCompletion({
            model: "gpt-4",
            prompt: `Branch ${branchId} is asking: ${query}`,  // Customize based on the app's needs
            temperature: 0.7,
            max_tokens: 150,
        });

        res.status(200).json({ result: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: 'Error communicating with ChatGPT' });
    }
}
