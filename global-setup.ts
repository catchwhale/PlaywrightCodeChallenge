import { chromium } from '@playwright/test';
import { login } from './utils/auth';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  //reusable login function
  await login(page);

  //save storage state for reuse across tests
  await context.storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;