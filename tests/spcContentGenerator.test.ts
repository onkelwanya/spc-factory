import axios from 'axios';
import { generateSPCContent } from '../src/spcContentGenerator';
import { OPENAI_API_URL, OPENAI_GPT_MODEL } from '../src/constants';
import { getOpenAIApiKey } from '../src/foundrySettingsGetter';

jest.mock('axios');
jest.mock('../src/foundrySettingsGetter.ts');

describe('generateSPCContent', () => {
    it('should generate SPC content with valid API key and prompt', async () => {
        const mockAPIKey = 'test-api-key';
        const mockResponse = {
            data: {
                choices: [{ message: { content: 'Generated SPC content' } }]
            },
        };

        (getOpenAIApiKey as jest.Mock).mockReturnValue(mockAPIKey);
        (axios.post as jest.Mock).mockResolvedValue(mockResponse);

        const prompt = 'Create an SPC character';
        const result = await generateSPCContent(prompt);

        expect(axios.post).toHaveBeenCalledWith(
            OPENAI_API_URL,
            { model: OPENAI_GPT_MODEL, messages: [{ role: 'user', content: prompt }] },
            { headers: { Authorization: `Bearer ${mockAPIKey}`, 'Content-Type': 'application/json' } },
        );

        expect(result).toBeUndefined();
    });

    it('should handle API errors gracefully', async () => {
        (getOpenAIApiKey as jest.Mock).mockReturnValue('test-api-key');
        (axios.post as jest.Mock).mockRejectedValue(new Error('API Error'));

        const prompt = 'Create an SPC character';
        await expect(generateSPCContent(prompt)).rejects.toThrow('API Error');
    });
});