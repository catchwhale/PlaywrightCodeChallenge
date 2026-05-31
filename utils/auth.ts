import { chromium, expect } from '@playwright/test';
import { env } from '../config/env';
import { LoginPage } from '../pages/LoginPage';

export async function login() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
   
    await loginPage.gotoURL(env.baseURL)
 
    await loginPage.login(env.username, env.password)
    await loginPage.verifysubURL(env.baseURL + '/web/index.php/dashboard/index');

    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}