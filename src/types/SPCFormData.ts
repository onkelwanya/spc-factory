export interface SPCFormData {
  name: string;
  species: string;
  clans: string[];
  age: number;
  regions: {label: string, value: string}[];
  challenge: string;
  disposition: string;
  countries: string[];
  allCountries?: { [region: string]: string[] };
}
