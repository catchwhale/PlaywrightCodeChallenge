import { test as base } from '@playwright/test';
import { EmployeeAPI } from '../services/employee.api';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{
  employeeAPI: EmployeeAPI;
  loginPage: LoginPage;
}>({
  employeeAPI: async ({ request }, use) => {
    const apiContext = request;

    const employeeAPI = new EmployeeAPI(apiContext);

    await use(employeeAPI);
  },
   
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';