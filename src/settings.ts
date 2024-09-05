/** OpenAI API constants */
export const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
export const OPENAI_GPT_MODEL = 'gpt-3.5-turbo';

/** FoundryVTT Setting getters */
export function getOpenAIApiKey(): string {
  return (game as Game).settings.get('spc-factory', 'openaiApiKey') as string;
}

/** SPC Generator List of Clans */
export const CLANS = [
  'Ventrue',
  'Toreador',
  'Brujah',
  'Gangrel',
  'Nosferatu',
  'Malkavian',
  'Tremere',
  'Lasombra',
  'Tzimisce',
  'Ravnos',
  'Ministry',
  'Giovanni',
  'Banu Haqim',
  'Caitiff',
  'Thin-Blood',
];

/** SPC Generator List of Regions */
export const REGIONS = [
  { label: 'Western Europe', value: 'western-europe' },
  { label: 'Eastern Europe', value: 'eastern-europe' },
  { label: 'North America', value: 'north-america' },
  { label: 'South America', value: 'south-america' },
  { label: 'Asia', value: 'asia' },
  { label: 'Africa', value: 'africa' },
  { label: 'Middle East', value: 'middle-east' },
  { label: 'Oceania', value: 'oceania' },
];

/** SPC Generator List of Countries by Region */
export const COUNTRIES_BY_REGION = {
  'western-europe': [
    'France',
    'Germany',
    'United Kingdom',
    'Spain',
    'Italy',
    'Netherlands',
    'Belgium',
    'Switzerland',
    'Austria',
    'Ireland',
  ],
  'eastern-europe': [
    'Poland',
    'Czech Republic',
    'Hungary',
    'Romania',
    'Bulgaria',
    'Slovakia',
    'Ukraine',
    'Serbia',
    'Croatia',
    'Russia',
  ],
  'north-america': [
    'United States',
    'Canada',
    'Mexico',
    'Cuba',
    'Haiti',
    'Dominican Republic',
    'Puerto Rico',
    'Jamaica',
    'Panama',
    'Guatemala',
  ],
  'south-america': [
    'Brazil',
    'Argentina',
    'Chile',
    'Colombia',
    'Peru',
    'Venezuela',
    'Uruguay',
    'Paraguay',
    'Ecuador',
    'Bolivia',
  ],
  asia: [
    'China',
    'Japan',
    'South Korea',
    'India',
    'Vietnam',
    'Thailand',
    'Indonesia',
    'Malaysia',
    'Philippines',
    'Singapore',
  ],
  africa: [
    'Nigeria',
    'South Africa',
    'Egypt',
    'Kenya',
    'Ethiopia',
    'Ghana',
    'Morocco',
    'Algeria',
    'Uganda',
    'Tanzania',
  ],
  'middle-east': [
    'Saudi Arabia',
    'Iran',
    'Iraq',
    'Israel',
    'Jordan',
    'Lebanon',
    'Turkey',
    'United Arab Emirates',
    'Qatar',
    'Kuwait',
  ],
  oceania: [
    'Australia',
    'New Zealand',
    'Papua New Guinea',
    'Fiji',
    'Solomon Islands',
    'Vanuatu',
    'Samoa',
    'Tonga',
    'Micronesia',
    'Palau',
  ],
};
