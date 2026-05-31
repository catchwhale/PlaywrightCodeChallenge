import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  readonly menus = [
    { name: 'Admin', url: '/admin/' },
    { name: 'PIM', url: '/pim/' },
    { name: 'Leave', url: '/leave/' },
    { name: 'Time', url: '/time/' },
    { name: 'Recruitment', url: '/recruitment/' },
    { name: 'My Info', url: '/viewPersonalDetails' },
    { name: 'Performance', url: '/performance/' },
    { name: 'Dashboard', url: '/dashboard/' },
    { name: 'Directory', url: '/directory/' },
    { name: 'Maintenance', url: '/maintenance/' },
    { name: 'Claim', url: '/claim/' },
    { name: 'Buzz', url: '/buzz/' }
  ];

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
}