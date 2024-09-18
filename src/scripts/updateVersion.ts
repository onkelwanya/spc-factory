import { promises as fs } from 'fs';
import * as readline from 'readline/promises';

export async function updateVersion(filePath: string, newVersion: string) {
  const fileData = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  fileData.version = newVersion;

  if (fileData.download) {
    fileData.download = fileData.download.replace(
      /\/\d+\.\d+\.\d+\//,
      `/${newVersion}/`
    );
  }

  await fs.writeFile(filePath, JSON.stringify(fileData, null, 2));
  console.log(`Updated version in ${filePath} to ${newVersion}`);
}

export async function main() {
  console.clear();
  console.log('SPC Factory Version Update Script.');

  const moduleFilePath = './module.json';
  const packageFilePath = './package.json';

  const moduleData = JSON.parse(await fs.readFile(moduleFilePath, 'utf-8'));

  console.log(`Current version: ${moduleData.version}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question('Do you want to update the version? (y/n): ');

  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    const newVersion = await rl.question(
      `Enter the new version (current version: ${moduleData.version}): `
    );

    await updateVersion(moduleFilePath, newVersion);
    await updateVersion(packageFilePath, newVersion);
  } else {
    console.log('Version update cancelled. Exiting script.');
  }

  rl.close();
}

main().catch(console.error);