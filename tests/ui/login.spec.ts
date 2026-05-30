import { test, expect } from '../../fixtures/test-fixtures';
// import { expect } from '@playwright/test';

import { testData } from '../../utils/test-data';

// disable storageState for ALL tests in this file
test.use({ storageState: undefined });

test('Verify can navigate to the OrangeHRM application @ui',
  async ({ loginPage }) => {

    await loginPage.prepareForLogin();
    await loginPage.goto('/');
    await loginPage.verifysubURL('/web/index.php/auth/login');
});


test('Verify user login to the application using provided admin credentials @ui',
  async ({ loginPage }) => {
    await loginPage.prepareForLogin();
    
    await loginPage.login(
      testData.login.username,
      testData.login.password
    );

    await loginPage.verifysubURL('/web/index.php/dashboard/index');
});