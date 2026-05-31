import { defineConfig } from '@playwright/test';
import { config } from './utils/config';

export default defineConfig({
    testDir: './tests',
    globalTimeout: 50000, // optional: disables full run limit
    timeout: 60000, // 60s per test (recommended starting point)
    expect: {
        timeout: 10000,
    },
    fullyParallel: true, // enables parallel per file
    retries: process.env.CI ? 1 : 0,
    globalSetup: require.resolve('./global-setup'),
    use: {
        baseURL: config.baseURL,
        actionTimeout: 0,     // clicks, fills, etc.
        navigationTimeout: 120000, // page.goto, reload
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        storageState: 'storageState.json',
        
    },
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['blob'],
        ['json', { outputFile: 'test-results.json' }]
      ],
    outputDir: 'test-results/',
})