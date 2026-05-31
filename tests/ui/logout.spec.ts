import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('@ui Logout Tests - OrangeHRM', () => {
  test('@ui [8] Verify can Logout from the application', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Login to application', async () => {
      await loginPage.gotoURL('/');
      await loginPage.logout();
      await loginPage.verifysubURL('/web/index.php/auth/login');
    });

    await test.step('Verify user is logged out', async () => {
      await loginPage.verifysubURL('/web/index.php/auth/login');
      
      await loginPage.verifyPlaceholderVisible('Username');
      await loginPage.verifyPlaceholderVisible('Password');
      await loginPage.verifyLoginButtonVisible('Login')
    });
  });

});