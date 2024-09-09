/** Dependency Imports */
import fs from 'fs';
import path from 'path';

/** Script Imports */
import { createCompendiumFromJSON } from './compendiumIngestion';

const compendia = [
  {
    jsonFile: 'data/names.json',
    compendiumName: 'Western Europe Names', // needs adjustment later
    outputPath: 'packs/western-europe-names.db'
  },
  // TODO: add all relevant compendia here
];

async function createCompendia() {
  for (const { jsonFile, compendiumName, outputPath } of compendia) {
    const filePath = path.join(__dirname, jsonFile);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log(`SPC Factory | Data Ingest | Ingesting data from ${ jsonFile } into ${ compendiumName }`);
      await createCompendiumFromJSON(compendiumName, data, outputPath);
    } else {
      console.error(`SPC Factory | Data Ingest | File not found ${jsonFile}`);
    }
  }
}


createCompendia()
  .then(() => {
    console.log('SPC Factory | Data Ingest | All Compendia created successfully.');
  })
  .catch((error) => {
    console.error(`SPC Factory | Data Ingest | Error creating compendia: ${error}`);
  })