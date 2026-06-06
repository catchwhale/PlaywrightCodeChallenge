import fs from 'fs';
import path from 'path';
import { login } from './utils/auth';
import { PATHS } from './config/paths';

const MAX_AGE_MS = 10 * 60 * 1000; // 10 minutes

function isStorageStateValid(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const state = JSON.parse(content);

    return (
      state &&
      Array.isArray(state.cookies) &&
      Array.isArray(state.origins)
    );
  } catch (error) {
    console.warn('Storage state is corrupted or invalid JSON.');
    return false;
  }
}

async function globalSetup() {
  console.log('Global setup started');

  const storageStatePath = path.resolve(PATHS.storageState);

  let shouldLogin = true;

  if (fs.existsSync(storageStatePath)) {
    const stats = fs.statSync(storageStatePath);
    const fileAge = Date.now() - stats.mtimeMs;

    const isExpired = fileAge > MAX_AGE_MS;
    const isValid = isStorageStateValid(storageStatePath);

    if (!isValid) {
      console.log('Storage state is corrupted. Deleting file...');
      fs.unlinkSync(storageStatePath);
    } else if (isExpired) {
      console.log('Storage state is expired. Deleting file...');
      fs.unlinkSync(storageStatePath);
    } else {
      console.log(
        `Storage state is valid (${Math.round(
          fileAge / 1000
        )}s old). Skipping login...`
      );

      shouldLogin = false;
    }
  }

  if (shouldLogin) {
    console.log('Storage state not found, expired, or corrupted. Performing login...');
    await login();
  }

  console.log('Global setup finished');
}

export default globalSetup;