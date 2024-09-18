/** Dependency Imports */
import * as fs from 'fs-extra';
import path from 'path';
import { exit } from 'process';
import * as readline from 'readline/promises';

export async function copyDist(destination: string) {
  try {
    const distFolder = path.join(__dirname, 'dist');
    if (!fs.existsSync(distFolder)) {
      console.error(`Could not locate the dist folder at ${distFolder}`);
      exit(1);
    }

    await fs.ensureDir(destination);
    await fs.copy(distFolder, destination);

    console.log(
      `copied the current dist folder at ${distFolder} to ${destination}`
    );
  } catch (error) {
    console.error('Error copying dist folder: ', error);
    exit(1);
  }
}

export async function main() {
  console.clear();
  console.log('SPC Factory | Deploy to Staging Staging Script.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question('Do you want to deploy to staging (y/n): ');
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    const destination = await rl.question(
      'Provide the path to the staging module/spc-factory: '
    );
    if (destination) {
      await copyDist(destination);
    } else {
      console.error('No path to staging was provided.');
      exit(1);
    }
  } else {
    console.log('Deployment aborted.');
    exit(0);
  }
}

main().catch(console.error);
