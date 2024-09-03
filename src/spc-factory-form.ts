import { generateSPCContent } from './api';

interface SPCFormData {
  name: string;
  species: string;
  region: string;
  challenge: string;
  disposition: string;
}

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
      template: 'modules/spc-factory/src/templates/spc-factory.html',
      classes: ['spc-factory'],
      width: 400,
      height: 'auto',
      closeOnSubmit: true,
    }) as FormApplicationOptions;
  }

  async getData(): Promise<SPCFormData> {
    return {
      name: '',
      species: 'human',
      region: 'western-europe',
      challenge: 'none',
      disposition: 'neutral',
    };
  }

  async _updateObject(event: Event, formData: SPCFormData): Promise<void> {
    console.log('Form data:', formData);

    const prompt = this.createPrompt(formData);

    try {
      const generatedContent = await generateSPCContent(prompt);
      console.log('generated content:', generatedContent);

      if (ui.notifications) {
        ui.notifications.info('SPC generated!');
      } else {
        console.warn('Notifications UI is not available.');
      }

      // TODO: Add the sheet creation after this
    } catch (error) {
      console.error('Failed to generate SPC content:', error);
    }
  }

  createPrompt(formData: SPCFormData): string {
    return `Create a character with the following traits:
      - Species: ${formData.species}
      - Region of Birth: ${formData.region}
      - Challenge Level: ${formData.challenge}
      - Disposition: ${formData.disposition}`;
  }
}
