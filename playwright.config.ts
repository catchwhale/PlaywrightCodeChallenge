import { defineConfig } from '@playwright/test';
import { config } from './utils/config';

export default defineConfig({
    testDir: './tests',
    timeout: 30000, // total per test
    use: {
        actionTimeout: 10000,     // clicks, fills, etc.
        navigationTimeout: 30000, // page.goto, reload
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: config.baseURL,
    },
})