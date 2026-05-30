import { chromium, expect } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/dashboard/);

  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;