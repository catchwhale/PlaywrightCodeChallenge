import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async gotoURL(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async logout() {
    await this.page.getByAltText('profile picture').click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    
  }

  async prepareForLogin() {
    await this.goto('/web/index.php/auth/login');
    try {
        await this.logout();
    } catch (error) {
        console.warn('Optional setup failed:', error);
    }
    
 }

  async verifysubURL(subURL: string) {
    await expect(this.page).toHaveURL(subURL);
  }
}