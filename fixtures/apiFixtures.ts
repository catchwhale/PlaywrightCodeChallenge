import { test as base } from '@playwright/test';
import { EmployeeApi } from '../api/endpoints/EmployeeApi';
import { EmployeeService } from '../api/services/employeeService';

type ApiFixtures = {
  employeeApi: EmployeeApi;
  employeeService: EmployeeService;
};

export const test = base.extend<ApiFixtures>({
  employeeApi: async ({request}, use) => {
    const employeeApi = new EmployeeApi(request);

    await employeeApi.initialize();

    await use(employeeApi);

    await employeeApi.dispose();
  },

  employeeService: async ({ employeeApi }, use) => {
    const employeeService = new EmployeeService(employeeApi);

    await use(employeeService);
  },
});

export { expect } from '@playwright/test';