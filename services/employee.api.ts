import { APIRequestContext, expect } from '@playwright/test';

export class EmployeeAPI {
  constructor(private apiContext: APIRequestContext) {}

  // =========================
  // GET employee by ID
  // =========================
  async getEmployeeById(employeeId: string) {
    const response = await this.apiContext.get(
      `/web/index.php/api/v2/pim/employees/${employeeId}`
    );

    expect(response.status()).toBe(200);

    return await response.json();
  }

  // =========================
  // SEARCH employees list
  // =========================
  async getEmployeeList(limit = 50, offset = 0) {
    const response = await this.apiContext.get(
      `/web/index.php/api/v2/pim/employees?limit=${limit}&offset=${offset}&model=detailed`
    );

    expect(response.ok()).toBeTruthy();

    return await response.json();
  }
}