import { generateSPCContent } from './api';
import { SPCActorData } from './types/SPCActorData';

interface SPCFormData {
  name: string;
  species: string;
  region: string;
  age: number;
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
      age: 30,
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

      const parsedContent = JSON.parse(generatedContent);

      const name = parsedContent.name;
      const traits = parsedContent.traits as string[] || [];
      const background = parsedContent.background as string[] || [];

      console.log("Traits:", traits);
      console.log("Background:", background);
      
      

      if (ui.notifications) {
        ui.notifications.info(`SPC generated: ${name}`);
      } else {
        console.warn('Notifications UI is not available.');
      }

      const traitList = traits.map(trait => `<li>${trait}</li>`).join('');
      const backgroudList = background.map(bg => `<li>${bg}</li>`).join('');

      const description = `
        <b>Age:</b> ${formData.age} years <br><br>
        <b>Region of Origin:</b> ${formData.region} <br><br>
        <b>Traits:</b><br><ul>${traitList}</ul><br>
        <b>Backgroud:</b><br><ul>${backgroudList}</ul><br>
      `;

      const actorData: SPCActorData = {
        name: name,
        type: 'spc',
        system: {
          notes: description,
          spcType: formData.species,
          gamesystem: 'mortal',
        },
      }

      const newActor = await Actor.create(actorData);
      newActor?.sheet?.render(true);

    } catch (error) {
      console.error('Failed to generate SPC content:', error);
    }
  }

  createPrompt(formData: SPCFormData): string {
    return `You are an AI helping to generate characters for the *Vampire: The Masquerade 5th Edition* tabletop role-playing game, set in the dark and gritty *World of Darkness*. 

      Please create a character with the following details:
      - **Region of Origin**: ${formData.region}
      - **Species**: ${formData.species}
      - **Challenge Level**: ${formData.challenge}
      - **Disposition**: ${formData.disposition}
      - **Age**: ${formData.age} years

      Tasks:
      1. **Name**: Generate a name appropriate to the character's region of origin, unless one is provided.
      2. **Character Traits**: Provide a bullet-point list of up to 10 traits that describe the character's personality and behavior, taking into account their species, region, and disposition. Ensure, that this list is concise and does not have run-on sentences.
      3. **Background**: Provide a brief, bullet-point summary of the character's backstory, including relevant life events, experiences, and any notable skills or abilities. Keep this backstory short and concise without run-on sentences.
        - If the character is a ghoul, ensure that the backstory highlights something that makes them particularly useful or valuable to their vampire master (e.g., a specific skill, loyalty, or personality trait).

      Please structure the output as JSON with the following fields:
      {
        "name": "Generated Name",
        "traits": [
          "Trait 1",
          "Trait 2",
          "... up to 10 traits"
        ],
        "background": [
          "Background point 1",
          "Background point 2",
          "... additional background points"
        ]
      }
      Contextualize all responses within the grim and gothic themes of the *World of Darkness*, keeping in mind the nuances of the *Vampire: The Masquerade* setting, such as the eternal struggle for power, the secrecy of the Kindred, and the darkness that permeates their world.`;
  }
}
