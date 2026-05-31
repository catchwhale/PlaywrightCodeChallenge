import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('OrangeHRM Navigation Menu', () => {
  test('@ui [3]Verify all left navigation menus are visible and functional', async ({ page }) => {

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
  test.only('@ui [4]Verify user can navigate to PIM module', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to OrangeHRM application', async () => {
      await loginPage.gotoURL('/');
      await loginPage.verifysubURL('/dashboard');
    });

    await test.step('Navigate to PIM module', async () => {
      await dashboardPage.navigateToPIM();
      await loginPage.verifysubURL('/pin');
    });

    await test.step('Verify PIM page is displayed', async () => {
      await expect(
        page.getByRole('heading', { name: 'PIM' })
      ).toBeVisible();
    });
  });
});