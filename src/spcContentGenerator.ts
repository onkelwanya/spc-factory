/** Dependency Imports */
import axios from 'axios';

/** Script Imports */
import { OPENAI_API_URL, OPENAI_GPT_MODEL } from './constants';

/** Types Imports */
import { SPCFormData } from './types/SPCFormData';

// TODO: Move to settings in foundry
const OPENAI_API_KEY =
  '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';

export async function generateSPCContent(prompt: string) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: OPENAI_GPT_MODEL,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const message = response.data.choices[0].message.content;
    return message;
  } catch (error) {
    console.error('Error generating SPC content:', error);
    throw new Error('Failed to generate content.');
  }
}

export function createPrompt(formData: SPCFormData): string {
  const introduction =
    'You are an AI helping to generate characters for the *Vampire: The Masquerade 5th Edition* tabletop role-playing game, set in the dark and gritty *World of Darkness*.';

  const characterDetails = `
  Please create a character with the following details:
  - **Region of Origin**: ${formData.region}
  - **Species**: ${formData.species}
  - **Challenge Level**: ${formData.challenge}
  - **Disposition**: ${formData.disposition}
  - **Age**: ${formData.age} years`;

  const tasks = `
  1. **Name**: Generate a name appropriate to the character's region of origin, unless one is provided.
  2. **Character Traits**: Provide a bullet-point list of up to 10 traits that describe the character's personality and behavior, taking into account their species, region, and disposition. Ensure, that this list is concise and does not have run-on sentences.
  3. **Background**: Provide a brief, bullet-point summary of the character's backstory, including relevant life events, experiences, and any notable skills or abilities. Keep this backstory short and concise without run-on sentences.
    - - If the character is a ghoul, ensure that the backstory highlights something that makes them particularly useful or valuable to their vampire master (e.g., a specific skill, loyalty, or personality trait).`;

  const outputStructure = `
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
    }`;

  const contextualNote =
    'Contextualize all responses within the grim and gothic themes of the *World of Darkness*, keeping in mind the nuances of the *Vampire: The Masquerade* setting, such as the eternal struggle for power, the secrecy of the Kindred, and the darkness that permeates their world.';

  const prompt = `
    ${introduction}
    ${characterDetails}
    ${tasks}
    ${outputStructure}
    ${contextualNote}
  `;

  return prompt.trim();
}
