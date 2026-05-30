// import {test, expect} from '../../fixtures/test-fixtures';
// import { LoginPage } from '../../pages/LoginPage';
// import { testData } from '../../utils/test-data';

// test('User login to the application using provided admin credentials @ui', async ({}) => {
//     await LoginPage.goto();
//     await LoginPage.verifybaseURL();
//     await LoginPage.login(testData.login.username, testData.login.password);
//     await LoginPage.verifyLoginSuccess();
// })

import { test, expect } from '../../fixtures/test-fixtures';
import { testData } from '../../utils/test-data';

test('User login to the application using provided admin credentials @ui', async ({ loginPage }) => {

  await loginPage.goto('/web/index.php/auth/login');

  await loginPage.logout()

  await loginPage.login(
    testData.login.username,
    testData.login.password
  );

  

  await loginPage.verifysubURL('/web\/index.php\/dashboard\/index/');
});