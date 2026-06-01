import { chromium } from '@playwright/test';
import { env } from '../config/env';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(env.baseURL);

  await page.fill('input[name="username"]', env.username);
  await page.fill('input[name="password"]', env.password);
  await page.click('button[type="submit"]');

  await page.context().storageState({
    path: 'storageState.json'
  });

  await browser.close();
}

main();