import { test, expect } from '../../fixtures/test-fixtures';

test.describe('@ui Smoke Tests - OrangeHRM', () => {

  test('@ui [1]Verify can navigate to OrangeHRM application', async ({ loginPage }) => {
    await loginPage.gotoURL('/');
    await loginPage.logout();
    // await loginPage.verifysubURL('/web/index.php/auth/login');
    await test.step('Navigate to OrangeHRM URL', async () => {
    //   await loginPage.gotoURL('/');
      await loginPage.verifysubURL('/web/index.php/auth/login');
    });

    await test.step('Verify login page is displayed', async () => {
    //   await expect(loginPage).toHaveURL(/orangehrmlive/i);
    //   await loginPage.verifysubURL('/orangehrmlive');


      await loginPage.verifyPlaceholderVisible('Username');
      await loginPage.verifyPlaceholderVisible('Password');
      await loginPage.verifyLoginButtonVisible('Login')
  });
});
});