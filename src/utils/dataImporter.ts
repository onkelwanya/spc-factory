/** Type Imports */
import { RegionData } from '../types/SPCData';

export async function importDataToRollTable(
  filePath: string,
  tableName: string
): Promise<void> {
  const response = await fetch(filePath);
  const data: RegionData = await response.json();

  const rollTable = await RollTable.create({
    name: tableName,
    description: `Auto-generated table from ${filePath}`,
    results: [],
  });

  Object.keys(data).forEach(async (region) => {
    const items = data[region];

    for (const item of items) {
      await rollTable?.createEmbeddedDocuments('TableResult', [
        {
          text: item,
          weight: 1,
          tyoe: CONST.TABLE_RESULT_TYPES.TEXT,
        },
      ]);
    }
  });

  console.log(`SPC Factory | RollTable ${tableName} created successfully.`);
}
