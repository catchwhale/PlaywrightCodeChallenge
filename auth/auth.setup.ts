import { request } from '@playwright/test';

async function globalSetup() {
  const api = await request.newContext();

  // LOGIN (API or UI session endpoint)
  await api.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', {
    form: {
      username: 'Admin',
      password: 'admin123',
    }
  });

  // SAVE SESSION
  await api.storageState({ path: 'storageState.json' });
}

export default globalSetup;