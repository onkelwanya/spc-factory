/** Type and Const Imports */
import { IngestDataType } from '../types/IngestDataTypes';
import { LOG_STR } from '../constants';


export async function loadCompendiumData(data: IngestDataType, compendiumName: string) {
  const pack = (game as Game).packs.get(compendiumName);

  if (!pack) {
    console.error(`${LOG_STR.prefix} ${LOG_STR.ingest} Compendium ${compendiumName} not found!`);
    return;
  }

  if (pack.locked) {
    await pack.configure({ locked: false });
  }

  const existingDocs = await pack.getDocuments();
  for (const doc of existingDocs) {
    await doc.delete();
  }

  const entries = [];

  for (const [region, names] of Object.entries(data.names)) {
    for (const name of names) {
      const entry = {
        name: name,
        type: 'RollTable',
        data: {
          description: { value: `A name from ${ region }` },
          results: [],
          formula: '1d100',
        },
        folder: null,
      };
      entries.push(entry);
    }
  }

  await pack.documentClass.createDocuments(entries, { pack: compendiumName });
  console.log(`${ LOG_STR.prefix } ${ LOG_STR.ingest } ${ entries.length } entries added to ${ compendiumName }`);
}