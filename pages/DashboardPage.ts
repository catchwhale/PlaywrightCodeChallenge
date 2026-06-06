import { Page, expect } from '@playwright/test';
import { MENU_ITEMS } from '../constants/menuData';

export class DashboardPage {
  constructor(private page: Page) {}

  readonly menus = MENU_ITEMS;

  async verifyMenuVisible(menuName: string) {
    await expect(
      this.page.getByRole('link', { name: menuName })
    ).toBeVisible();
  }

  async navigateToMenu(menuName: string, expectedUrl: string) {
    const menu = this.page.getByRole('link', { name: menuName });

    await menu.click();

    await expect(this.page).toHaveURL(
      new RegExp(expectedUrl.replace(/\//g, '\\/'))
    );
  }
  
  async navigateToPIM() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.getByRole('link', { name: 'PIM' }).click();
  }
  
}