import { defineConfig } from '@playwright/test';
import { config } from './utils/config';

export default defineConfig({
    testDir: './tests',
    timeout: 30000, // total per test
    expect: {
        timeout: 5000,
    },
    fullyParallel: true, // enables parallel per file
    workers: process.env.CI ? 2 : undefined,
    retries: 1,
    globalSetup: require.resolve('./auth/auth.setup'),
    use: {
        baseURL: config.baseURL,
        actionTimeout: 10000,     // clicks, fills, etc.
        navigationTimeout: 30000, // page.goto, reload
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        storageState: 'storageState.json',
        
    },
    reporter: [
         ['html'],
         ['list'],
        ['junit', { outputFile: 'test-results/junit.xml' }]
    ],

    outputDir: 'test-results/',
})