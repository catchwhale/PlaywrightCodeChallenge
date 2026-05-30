import {test, expect} from '../../fixtures/testFixtures';
import { LoginPage } from '../../pages/LoginPage';

test('User login to the application using provided admin credentials @ui', async ({ loginPage}) => {
    await loginPage.goto('/web/index.php/auth/login');
    await loginPage.verifybaseURL();
    await loginPage.login('Admin', 'admin123');
    await loginPage.verifyLoginSuccess();
})