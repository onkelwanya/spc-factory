/** Constant Imports */
import { DATA_PATHS } from './constants';

/** Ingestion Types Enum */
enum IngestionTypes {
  Names,
  Clans,
}

export function compendiumExists(compendiumName: string): boolean {
  return (game as Game).packs.get(compendiumName) !== undefined;
}

export async function createRollTableFromJSON(
  label: string,
  data: string[],
  compendium: string
): Promise<RollTable | null> {
  const rollTableData = {
    name: `RollTable: ${label}`,
    formula: `1d${data.length}`,
    type: CONST.TABLE_RESULT_TYPES.TEXT,
    results: data.map((item, index) => ({
      text: item,
      weight: 1,
      range: [index + 1, index + 1] as [number, number],
    })),
  };

  const rollTable = await RollTable.create(rollTableData, { pack: compendium });
  return rollTable ?? null;
}

export async function fetchAllNamesFromJSON() {
  const fileList = await fetch(DATA_PATHS.NAMES).then((res) => res.json());

  const jsonFiles = [];

  for (const file of fileList) {
    const filePath = `${DATA_PATHS.NAMES}${file}`;
    const response = await fetch(filePath);
    const jsonData = await response.json();
    jsonFiles.push(jsonData);
  }

  return jsonFiles;
}

// TODO: create additional methods to deal with other injestions

export async function ingestData(type: IngestionTypes) {
  let data;
  const compendiumName = `spc-factory.${type}`;

  switch (type) {
    case IngestionTypes.Names:
      data = await fetchAllNamesFromJSON();
      if (data) {
        for (const file of data) {
          const { country, names } = file;
          await createRollTableFromJSON(country, names, compendiumName);
        }
      }
      break;

    default:
      break;
  }
}
