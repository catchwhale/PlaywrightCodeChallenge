import { APIRequestContext, request } from '@playwright/test';

export class ApiClient {
  protected apiContext!: APIRequestContext;

  async initialize() {
    this.apiContext = await request.newContext({
      storageState: 'storageState.json',
    });
  }

  async dispose() {
    await this.apiContext.dispose();
  }
}