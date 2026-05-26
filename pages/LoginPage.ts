import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    username = () => this.page.locator('input[name="username"]');
    password = () => this.page.locator(('input[name="password"]'));
    loginBtn = () => this.page.locator('button[type="submit"]');

    async login(user: string, pass: string) {
        await this.username().fill(user);
        await this.password().fill(pass);
        await this.loginBtn().click();
    }
    
    async verifybaseURL() {
        await expect(this.page).toHaveURL('/web\/index.php\/auth\/login')
    }
    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(/dashboard\/index/);
    }
}