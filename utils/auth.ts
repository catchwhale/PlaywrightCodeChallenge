import { Page, expect } from '@playwright/test';
import { env } from '../config/env';

export async function login(page: Page) {
  await page.goto(env.baseURL);

  await page.fill('input[name="username"]', env.username);
  await page.fill('input[name="password"]', env.password);

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/dashboard/);
}