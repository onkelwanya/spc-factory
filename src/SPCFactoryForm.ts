/** Script Imports */
import { generateSPCContent, createPrompt } from './spcContentGenerator';
import {
  handleRegionAndCountrySelection,
  handleSpeciesAndClanSelection,
} from './spcFormHandlers';

/** Type Imports */
import { SPCActorData } from './types/SPCActorData';
import { SPCFormData } from './types/SPCFormData';

/** Seetings Imports */
import { CLANS, COUNTRIES_BY_REGION, REGIONS } from './constants';
import { getOpenAIApiKey } from './foundrySettingsGetter';

export class SPCFactoryForm extends FormApplication<
  FormApplicationOptions,
  SPCFormData
> {
  constructor(options: Partial<FormApplicationOptions> = {}) {
    super(options);
  }

  static get defaultOptions(): FormApplicationOptions {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: 'spc-factory-form',
      title: 'SPC Factory',
      template: 'modules/spc-factory/src/templates/spc-factory.hbs',
      classes: ['spc-factory'],
      width: 450,
      height: 'auto',
      closeOnSubmit: true,
    }) as FormApplicationOptions;
  }

  activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);

    handleRegionAndCountrySelection(html);
    handleSpeciesAndClanSelection(html);
  }

  async getData(): Promise<SPCFormData> {
    return {
      name: '',
      species: 'human',
      clans: CLANS,
      regions: REGIONS,
      countries: COUNTRIES_BY_REGION['western-europe'],
      age: 30,
      challenge: 'none',
      disposition: 'neutral',
      country: 'Germany',
    };
  }

  async _updateObject(event: Event, formData: SPCFormData): Promise<void> {
    const OPENAI_API_KEY = getOpenAIApiKey();
    if (!OPENAI_API_KEY) {
      ui.notifications?.error(
        'OpenAI API Key is not set. Please configure the key in the module options'
      );
    }

    console.log('SPC Factory | Form data:', formData);

    const prompt = createPrompt(formData);

    try {
      const generatedContent = await generateSPCContent(prompt);
      console.log('generated content:', generatedContent);

      const parsedContent = JSON.parse(generatedContent);

      const name = parsedContent.name;
      const traits = (parsedContent.traits as string[]) || [];
      const background = (parsedContent.background as string[]) || [];
      const standardDicePools = parsedContent.standarddicepools;
      const exceptionalDicePools = parsedContent.exceptionaldicepools;
      const disciplines =
        formData.species !== 'mortal' ? parsedContent.disciplines : null;
      const generalDifficulties = parsedContent.generaldifficulty;
      const health = parsedContent.health;
      const willpower = parsedContent.willpower;

      console.log('Traits:', traits);
      console.log('Background:', background);

      if (ui.notifications) {
        ui.notifications.info(`SPC generated: ${name}`);
      } else {
        console.warn('Notifications UI is not available.');
      }

      const traitList = traits.map((trait) => `<li>${trait}</li>`).join('');
      const backgroudList = background.map((bg) => `<li>${bg}</li>`).join('');

      const description = `
        <b>Age:</b> ${formData.age} years <br><br>
        <b>Country of Origin:</b> ${formData.country} <br><br>
        <b>Traits:</b><br><ul>${traitList}</ul><br>
        <b>Backgroud:</b><br><ul>${backgroudList}</ul><br>
      `;

      const actorData: SPCActorData = {
        name: name,
        type: 'spc',
        system: {
          notes: description,
          generaldifficulty: generalDifficulties,
          health: {
            max: health.max,
            value: health.value,
          },
          willpower: {
            max: willpower.max,
            value: willpower.value,
          },
          standarddicepools: standardDicePools,
          exceptionaldicepools: exceptionalDicePools,
          disciplines: disciplines,
          spcType: formData.species,
          gamesystem: 'mortal',
        },
      };

      const newActor = await Actor.create(actorData);
      newActor?.sheet?.render(true);
    } catch (error) {
      console.error('Failed to generate SPC content:', error);
    }
  }
}
