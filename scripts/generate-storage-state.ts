import { chromium } from '@playwright/test';
import { env } from '../config/env';
import fs from 'fs';
import { ensureAuthDir } from '../config/auth';
import { PATHS } from '../config/paths';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  ensureAuthDir();

  await page.goto(env.baseURL);

  await page.fill('input[name="username"]', env.username);
  await page.fill('input[name="password"]', env.password);
  await page.click('button[type="submit"]');

  await page.context().storageState({
    path: PATHS.storageState
  });

  await browser.close();
}

main();