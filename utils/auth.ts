import { chromium } from '@playwright/test';
import fs from 'fs';
import { env } from '../config/env';
import { LoginPage } from '../pages/LoginPage';
import { ensureAuthDir } from '../config/auth';
import { PATHS } from '../config/paths';


export async function login() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);

    ensureAuthDir();
   
    await loginPage.gotoURL(env.baseURL)
 
    await loginPage.login(env.username, env.password)
    await loginPage.verifysubURL(env.baseURL + '/web/index.php/dashboard/index');

    await page.context().storageState({
        path: PATHS.storageState
    });
    await browser.close();
    await page.context().close();

}

export async function getStorageState() {
  if (!fs.existsSync(PATHS.storageState)) {
    throw new Error('Storage state not found');
  }
  return PATHS.storageState;
}