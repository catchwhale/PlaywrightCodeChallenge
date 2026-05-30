import { test, request, expect } from '@playwright/test';

test('get list using authenticated session @api', async () => {

  // 🔐 Load saved login session
  const apiContext = await request.newContext({
    storageState: 'storageState.json',
  });

  // 📡 Example: GET list endpoint
  const response = await apiContext.get(
    'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users'
  );

  expect(response.ok()).toBeTruthy();

  const data = await response.json();

  console.log(data);
});