import { defineConfig } from '@playwright/test';
import { env } from './config/env';
import { chromium } from '@playwright/test';
import { PATHS } from './config/paths';

export default defineConfig({
    testDir: './tests',
    globalTimeout: 60 * 60 * 1000, // 1 hour
    timeout:  120 * 1000, // 2 minutes per test
    expect: {
        timeout: 15 * 1000,
    },
    fullyParallel: false, // enables parallel per file
    workers: 1,
    retries: 0,
    maxFailures: 0,        // IMPORTANT: do NOT stop after failures
    globalSetup: './global-setup.ts',
    use: {
        baseURL: env.baseURL,
        actionTimeout: 121 * 1000,
        navigationTimeout: 240 * 1000,
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