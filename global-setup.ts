import fs from 'fs';
import path from 'path';
import { login } from './utils/auth';
import { PATHS } from './config/paths';

const ONE_MINUTE = 600 * 1000;

async function globalSetup() {
  console.log('Global setup started');

  const storageStatePath = path.resolve(PATHS.storageState);

  if (fs.existsSync(storageStatePath)) {
    const stats = fs.statSync(storageStatePath);
    const fileAge = Date.now() - stats.mtimeMs;

    if (fileAge > ONE_MINUTE) {
      console.log('Storage state is older than 6 minutes. Deleting file...');
      fs.unlinkSync(storageStatePath);
    } else {
      console.log(`Storage state is fresh (${Math.round(fileAge / 1000)}s old). Skipping login...`);
      return;
    }
  }

  console.log('Storage state not found or expired. Performing login...');
  await login();

  console.log('Global setup finished');
}

export default globalSetup;