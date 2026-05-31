import { test, expect } from '../../fixtures/test-fixtures';
import { testData } from '../../utils/test-data';
// import { test, expect } from '@playwright/test';

// disable storageState for ALL tests in this file
// test.use({ storageState: undefined });
test.describe('Login Tests', () => {

  test('@ui [1]Verify can navigate to the OrangeHRM application', async ({ loginPage }) => {

      await loginPage.prepareForLogin();
      await loginPage.gotoURL('/');
      await loginPage.verifysubURL('/web/index.php/auth/login');
  });


  test('@ui [2]Verify user login to the application using provided admin credentials', async ({ loginPage }) => {
      await loginPage.prepareForLogin();
      
      await loginPage.login(
        testData.login.username,
        testData.login.password
      );

      await loginPage.verifysubURL('/web/index.php/dashboard/index');
  });

});