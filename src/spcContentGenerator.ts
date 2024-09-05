/** Dependency Imports */
import axios from 'axios';

/** Settings Imports */
import { getOpenAIApiKey, OPENAI_API_URL, OPENAI_GPT_MODEL } from './constants';

/** Types Imports */
import { SPCFormData } from './types/SPCFormData';

export async function generateSPCContent(prompt: string) {
  const OPENAI_API_KEY = getOpenAIApiKey();
  if (!OPENAI_API_KEY) {
    ui.notifications?.error(
      'OpenAI API Key is not set. Please configure the key in the module options'
    );
  }
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

  const attributesAndCapabilities = `
  1.	**Standard Dice Pools**:
	-	**Physical**: The overall competence in physical tasks (Strength, Dexterity, Stamina).
	-	**Social**: The overall competence in social interactions (Charisma, Manipulation, Composure).
	-	**Mental**: The overall competence in mental tasks (Intelligence, Wits, Resolve).
	-	**Guidance**: Average value for a standard dice pool should be around 3. This represents an average attribute value (2) plus a slightly below-average skill value (1). Adjust based on the challenge level: lower for easier characters, higher for more challenging ones.
	2.	**Exceptional Dice Pools**:
	-	**Skills**: Identify specific skills where the character excels beyond their standard dice pool (e.g., Brawl, Melee, Awareness). The value provided should be the absolute skill value, which **must be higher** than the corresponding standard dice pool for that category.
	-	**Guidance**: The number of exceptional dice pools should correlate with the challenge level:
	-	**None**: No exceptional dice pools.
	-	**Small**: 1-2 exceptional dice pools.
	-	**Medium**: 3-4 exceptional dice pools.
	-	**Big**: 5 or more exceptional dice pools.
	-	Ensure that exceptional dice pool values are greater than the standard dice pool values to reflect true expertise in those skills.
	3.	**Disciplines** (for Ghouls and Vampires):
	-	**Vampires**: Can have multiple disciplines, with each discipline’s value ranging from 1 to 5 based on the character’s age and challenge level. Higher values are reserved for more challenging characters.
	-	**Ghouls**: Limited to 1-3 disciplines, with values between 1 and 2. These should be reflective of the character’s utility to their vampire master.
	-	**Guidance**: Use the character’s age and challenge level to determine the number and level of disciplines. Vampires should have a broader range, while ghouls are more limited.
	4.	**General Difficulties**:
	-	**Normal Difficulty**: This represents the challenge rating for standard rolls against the character, typically ranging from 2 to 5.
	-	**Strongest Difficulty**: For the most difficult challenges, typically ranging from 6 to 8, representing nearly impossible tasks.
	-	**Guidance**: Base the values on the character’s challenge level, with higher difficulties reserved for more challenging characters.
	5.	**Health and Willpower**:
	-	**Health**: Related to the character’s Physical dice pool. Minimum value is 2, with no maximum. Adjust based on challenge level and physical attributes.
	-	**Willpower**: Related to the character’s Mental dice pool. Minimum value is 2, with no maximum. Adjust based on challenge level and mental attributes.`;

  const narrativeElements = `
  1.	**Name**: Generate a name appropriate to the character’s region of origin, unless one is provided.
	2.	**Character Traits**: Provide a bullet-point list of up to 10 traits that describe the character’s personality and behavior, taking into account their species, region, and disposition. Ensure that this list is concise and does not have run-on sentences.
	3.	**Background**: Provide a brief, bullet-point summary of the character’s backstory, including relevant life events, experiences, and any notable skills or abilities. Keep this backstory short and concise without run-on sentences.
	-	If the character is a ghoul, ensure that the backstory highlights something that makes them particularly useful or valuable to their vampire master (e.g., a specific skill, loyalty, or personality trait).`;

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
    ],
    "standarddicepools": {
      "physical": { "value": X },
      "social": { "value": Y },
      "mental": { "value": Z }
    },
    "exceptionaldicepools": {
      "brawl": { "value": A, "visible": true },
      "melee": { "value": B, "visible": true },
      "awareness": { "value": C, "visible": true }
    },
    "disciplines": {
      "dominate": { "description": "", "value": X, "powers": [], "visible": true },
      "fortitude": { "description": "", "value": Y, "powers": [], "visible": true },
      "presence": { "description": "", "value": Z, "powers": [], "visible": true }
    },
    "generaldifficulty": {
      "strongest": { "value": X },
      "normal": { "value": Y }
    },
    "health": {
      "max": X,
      "value": X
    },
    "willpower": {
      "max": X,
      "value": X
    }
  }`;

  const contextualNote = `
  -	Contextualize all responses within the grim and gothic themes of the World of Darkness, emphasizing the eternal struggle for power, the secrecy of the Kindred, and the darkness that permeates their world.
	-	Ensure that the generated character is balanced according to the provided challenge level, with attributes and capabilities that reflect the character’s background and species.
	-	**Important**: Ensure that any exceptional dice pool value is greater than the corresponding standard dice pool value in the same category, and that the number of exceptional dice pools matches the challenge level.
	-	**Note**: For disciplines, powers should be an empty array, description should be an empty string, and visible should be set to true.`;

  const prompt = `
    ${introduction}
    **Character Details:**
    ${characterDetails}
    **Attributes and Capabilities:**
    ${attributesAndCapabilities}
    **Narrative Elements:**
    ${narrativeElements}
    **JSON Output:**
    ${outputStructure}
    **Contextual Notes**
    ${contextualNote}
  `;

  return prompt.trim();
}
