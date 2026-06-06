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

        test('@api [2] Verify search for employee created in UI using Employee ID', async ({ page, employeeApi }) => {

            
            employeeId = await pimPage.addEmployee(
                employee.firstName,
                employee.lastName
            );
            const response = await employeeApi.getEmployeeById(employeeId);
            expect(response.ok()).toBeTruthy();
            await expect
                .poll(async () => {
                    const response =
                    await employeeApi.getEmployeeById(employeeId);

                    const body = await response.json();
                    expect(body.data[0].employeeId).toBe(employeeId);

                    return body.data.length;
                }).toBeGreaterThan(0);
            const body = await response.json();
            expect(body.data[0].employeeId).toBe(employeeId);
            console.log(body.data[0]);
        });
    });
});