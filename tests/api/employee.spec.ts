import { test, expect } from '../../fixtures/apiFixtures';
import { LoginPage } from '../../pages/LoginPage';
import { PIMPage } from '../../pages/PIMPage';
import { generateEmployeeName } from '../../utils/randomData';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('API Module Tests', () => {
      test('@api [1] Fetch the employee list using OrangeHRM API call', async ({ employeeApi }) => {

        const response = await employeeApi.getEmployees();

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toBeDefined();
        expect(body.data.length).toBeGreaterThan(0);

        const firstEmployee = body.data[0];

        expect(firstEmployee.employeeId).toBeDefined();
        expect(firstEmployee.firstName).toBeDefined();
        expect(firstEmployee.lastName).toBeDefined();
        console.log("Test # 1")
    });
});