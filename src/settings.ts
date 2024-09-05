/** OpenAI API constants */
export const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
export const OPENAI_GPT_MODEL = 'gpt-3.5-turbo';

/** FoundryVTT Setting getters */
export function getOpenAIApiKey(): string {
  return (game as Game).settings.get('spc-factory', 'openaiApiKey') as string;
}
