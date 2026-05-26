import {test, expect} from '../fixtures/testFixtures';
import { LoginPage } from '../pages/LoginPage';

test('User can navigate to the OrangeHRM application', async ({ loginPage}) => {
    await loginPage.goto('/web/index.php/auth/login');
    await loginPage.verifybaseURL();
})

test.only('User login to the application using provided admin credentials', async ({ loginPage}) => {
    await loginPage.goto('/web/index.php/auth/login');
    await loginPage.verifybaseURL();
    await loginPage.login('Admin', 'admin123');
    await loginPage.verifyLoginSuccess();
})