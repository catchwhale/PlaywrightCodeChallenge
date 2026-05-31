import { APIRequestContext } from '@playwright/test';

export class EmployeeApi {
  constructor(private request: APIRequestContext) {}

  async createEmployee(firstName: string, lastName: string) {
    const response = await this.request.post(
      '/web/index.php/api/v2/pim/employees',
      {
        data: {
          firstName,
          lastName
        }
      }
    );

    return response.json();
  }
}