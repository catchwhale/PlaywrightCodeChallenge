import { test, expect } from '../../fixtures/apiFixtures';
import { LoginPage } from '../../pages/LoginPage';
import { PIMPage } from '../../pages/PIMPage';
import { generateEmployeeName } from '../../utils/randomData';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('API Module Tests', () => {
    test.describe('UI + API Tests', () => {
        let pimPage;
        let loginPage;
        let dashboardPage;
        let employee;
        let employeeId;

        test.beforeEach(async ({page}) => {
            console.log('beforeEach started');
            pimPage = new PIMPage(page);
            loginPage = new LoginPage(page);
            dashboardPage = new DashboardPage(page);
            console.log('gotoDashboard');
            await loginPage.gotoDashboard();
            console.log('navigateToPIM');
            await test.step('Navigate to PIM module', async () => {
                
                await dashboardPage.navigateToPIM();
                // console.log('verifyURL');
                
               
                await loginPage.verifysubURL(
                    '/web/index.php/pim/viewEmployeeList'
                );
 
            });
            employee = generateEmployeeName();
            await pimPage.navigateAddEmployee();
            console.log(await page.url());
        });
        test('@api [3] Validate that UI data matches API response', async ({ page, employeeService }) => {
            employeeId = await pimPage.addEmployee(
                employee.firstName,
                employee.lastName
            );

            const apiEmployee = await employeeService.getEmployee(employeeId);
            
            expect(apiEmployee.employeeId).toBe(employeeId);
            expect(apiEmployee.firstName).toBe(employee.firstName);
            expect(apiEmployee.lastName).toBe(employee.lastName);

            expect(apiEmployee.jobTitle).toStrictEqual({
                id: null,
                title: null,
                isDeleted: null
            });
            console.log(apiEmployee)
        });
    });
});