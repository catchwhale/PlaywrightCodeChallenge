import { APIRequestContext, request } from '@playwright/test';
import { PATHS } from '../../config/paths';

export class ApiClient {
  protected apiContext!: APIRequestContext;

  async initialize() {
    this.apiContext = await request.newContext({
      storageState: PATHS.storageState,
    });
  }

  async dispose() {
    await this.apiContext.dispose();
  }
}