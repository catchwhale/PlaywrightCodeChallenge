import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('OrangeHRM Navigation Menu', () => {
  test('Verify all left navigation menus are visible and functional', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Login to OrangeHRM', async () => {
      await loginPage.gotoURL('/');
      await expect(page).toHaveURL(/dashboard/i);
    });

    for (const menu of dashboardPage.menus) {
      await test.step(`Verify ${menu.name} menu is visible`, async () => {
        await dashboardPage.verifyMenuVisible(menu.name);
      });

      await test.step(`Navigate to ${menu.name}`, async () => {
        await dashboardPage.navigateToMenu(
          menu.name,
          menu.url
        );
      });
    }
  });
});