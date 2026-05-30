import { request } from '@playwright/test';

export async function getAuthApi() {
  return await request.newContext({
    storageState: 'storageState.json',
  });
}