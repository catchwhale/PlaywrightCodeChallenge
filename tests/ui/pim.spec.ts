import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { PIMPage } from '../../pages/PIMPage';
import { generateEmployeeName } from '../../utils/randomData';
test.describe('PIM Module Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let pimPage: PIMPage;

  let firstName: string;
  let lastName: string;
  let employeeId: string;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    pimPage = new PIMPage(page);

    const employee = generateEmployeeName();
    firstName = employee.firstName;
    lastName = employee.lastName;

    await loginPage.gotoURL('/web/index.php/dashboard/index');
    await loginPage.verifysubURL('/dashboard/');
    await test.step('Navigate to PIM module', async () => {
        await dashboardPage.navigateToPIM();
        await expect(page).toHaveURL(/pim/); 
    });
  });

  test('@ui [5]Verify to add a new employee and capture Employee ID', async ({ page }) => {
    
    // const pimPage = new PIMPage(page);
    // const { firstName, lastName } = generateEmployeeName();
    // let employeeId: string;

    await test.step('Add new employee', async () => {
      await pimPage.clickAddEmployee();
      employeeId = await pimPage.addEmployee(firstName, lastName);
      console.log('Captured Employee ID:', employeeId);
    });

    await test.step('Verify employee created', async () => {
      await pimPage.verifyEmployeeCreated(firstName, lastName);
    });
  });


test('@ui [6]Validate employee appears in employee list with correct details', async ({ page }) => {


     await test.step('Add new employee', async () => {
      await pimPage.clickAddEmployee();
      employeeId = await pimPage.addEmployee(firstName, lastName);
    //   console.log('Captured Employee ID:', employeeId);
    });

    
    await test.step('Navigate to PIM and add employee', async () => {
        await pimPage.clickAddEmployee();
        await dashboardPage.navigateToPIM();
        employeeId = await pimPage.addEmployee(firstName, lastName);
    });

    await test.step('Go to Employee List', async () => {
        await pimPage.goToEmployeeList();
    });

    await test.step('Search employee by ID', async () => {
        await pimPage.searchEmployeeById(employeeId);
    });

    await test.step('Verify employee details', async () => {
        await pimPage.verifyEmployeeInList(firstName, lastName, employeeId);
    });
  });
});