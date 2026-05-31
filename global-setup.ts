import { chromium } from '@playwright/test';
import { login } from './utils/auth';

async function globalSetup() {
  console.log('Global setup started');

//   const browser = await chromium.launch();
//   const context = await browser.newContext();

  await login();

//   await context.storageState({ path: 'storageState.json' });

//   await browser.close();
//   await context.close();

  console.log('Global setup finished');
}

export default globalSetup;