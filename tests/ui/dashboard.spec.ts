import { test, expect } from '@playwright/test';

test('Verify dashboard loads after login @ui', async ({ page }) => {
  await page.goto('/web/index.php/dashboard/index');

  await expect(page).toHaveURL(/dashboard/);
});