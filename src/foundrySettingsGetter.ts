/** FoundryVTT setting getters */
export function getOpenAIApiKey(): string {
  return (game as Game).settings.get('spc-factory', 'openaiApiKey') as string;
}
