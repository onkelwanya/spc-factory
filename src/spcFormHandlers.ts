import { COUNTRIES_BY_REGION } from './constants';

export function handleRegionAndCountrySelection(
  html: JQuery<HTMLElement>
): void {
  const regionSelect = html.find('select[name="region');
  const countrySelectGroup = html.find('#country-select-group');
  const countrySelect = html.find('select[name="country');

  regionSelect.on('change', (event) => {
    const selectedRegion = (event.target as HTMLSelectElement).value;

    if (selectedRegion) {
      const countries = getCountriesForRegion(selectedRegion);
      updateCountryOptions(countrySelect, countries);
      countrySelectGroup.show();
    } else {
      countrySelectGroup.hide();
    }
  });

  // regionSelect.trigger('change');
}

export function handleSpeciesAndClanSelection(html: JQuery<HTMLElement>): void {
  const speciesSelect = html.find('input[name="species"]');
  const clanSelectGroup = html.find('#clan-select-group');
  const domitorClanSelectGroup = html.find('#domitor-clan-select-group');

  speciesSelect.on('change', (event) => {
    const selectedSpecies = (event.target as HTMLInputElement).value;

    if (selectedSpecies === 'vampire') {
      domitorClanSelectGroup.hide();
      clanSelectGroup.show();
    } else if (selectedSpecies === 'ghoul') {
      clanSelectGroup.hide();
      domitorClanSelectGroup.show();
    } else {
      clanSelectGroup.hide();
      domitorClanSelectGroup.hide();
    }
  });

  // speciesSelect.trigger('change');
}

function updateCountryOptions(
  countrySelect: JQuery<HTMLElement>,
  countries: string[]
): void {
  countrySelect.empty();
  countries.forEach((country) => {
    countrySelect.append(new Option(country, country));
  });
}

function getCountriesForRegion(region: string): string[] {
  return COUNTRIES_BY_REGION[region] || [];
}
