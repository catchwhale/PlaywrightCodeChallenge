import { PIMPage } from '../../pages/PIMPage';
import { generateEmployeeName } from '../../utils/randomData';
import { test, expect } from '../../fixtures/apiFixtures';
// import { EmployeeService } from '../../api/services/employeeService';
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
    });

    test('@api [2] Verify search for the employee created in UI using Employee ID', async ({
    page,
    employeeApi
    }) => {

    const pimPage = new PIMPage(page);

    const employee = generateEmployeeName();

    const employeeId = await pimPage.addEmployee(
        employee.firstName,
        employee.lastName
    );

    const response = await employeeApi.getEmployeeById(employeeId);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(body.data.employeeId)
        .toBe(employeeId);
    });

    test('@api [3] Validate that UI data matches API response (name, job title, employee ID)', async ({
    page, employeeService
    }) => {

        // Login UI
        // Create employee UI
        const pimPage = new PIMPage(page);
        const newEmployee = generateEmployeeName();
        const firstName = employee.firstName;
        const lastName = employee.lastName;

        const employeeId = await pimPage.addEmployee(
        newEmployee.firstName,
        newEmployee.lastName
    );

        const pimPage = new PIMPage(page);
        const newEmployee = generateEmployeeName();
        const employeeId = await pimPage.addEmployee(
        newEmployee.firstName,
        newEmployee.lastName
    );

    const employee = await employeeService.getEmployee(employeeId);

    expect(employee.employeeId)
        .toBe(employeeId);
    });

})