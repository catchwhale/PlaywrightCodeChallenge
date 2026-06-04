import { defineConfig } from '@playwright/test';
import { env } from './config/env';
import { chromium } from '@playwright/test';
import { PATHS } from './config/paths';

export default defineConfig({
    testDir: './tests',
    globalTimeout: undefined, // optional: disables full run limit
    timeout:  120 * 1000, // 2 minutes per test
    expect: {
        timeout: 15 * 1000,
    },
    fullyParallel: false, // enables parallel per file
    workers: 1,
    retries: 0,
    globalSetup: './global-setup.ts',
    use: {
        baseURL: env.baseURL,
        actionTimeout: 60 * 1000,
        navigationTimeout: 120 * 1000,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        storageState: PATHS.storageState,
        
    },
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['blob'],
        ['json', { outputFile: 'test-results.json' }]
      ],
    outputDir: 'test-results/',
})