import { defineConfig } from '@playwright/test';
import { config } from './utils/config';

export default defineConfig({
    testDir: './tests',
    globalTimeout: 0, // optional: disables full run limit
    timeout: 60000, // 60s per test (recommended starting point)
    expect: {
        timeout: 10000,
    },
    fullyParallel: true, // enables parallel per file
    workers: process.env.CI ? 4 : undefined,
    retries: process.env.CI ? 1 : 0,
    globalSetup: require.resolve('./auth/auth.setup'),
    use: {
        baseURL: config.baseURL,
        actionTimeout: 0,     // clicks, fills, etc.
        navigationTimeout: 45000, // page.goto, reload
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        storageState: 'storageState.json',
        
    },

  reporter: [
    ['html', { outputFolder: 'test-results/html-report', open: 'never' }],
    ['list']
  ],

    outputDir: 'test-results/',
})