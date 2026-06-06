import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { PIMPage } from '../../pages/PIMPage';
import { generateEmployeeName } from '../../utils/randomData';
import { login } from '../../utils/auth';

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

    await loginPage.gotoDashboard();
    await test.step('Navigate to PIM module', async () => {
        await dashboardPage.navigateToPIM();
        await loginPage.verifysubURL('/web/index.php/pim/viewEmployeeList'); 
    });
  });

  test('@ui [5 ]Verify to add a new employee and capture Employee ID', async ({ page }) => {
    const employee = generateEmployeeName();
    await test.step('Add new employee', async () => {
      
      const employeeId = await pimPage.addEmployee(employee.firstName, employee.lastName);
      console.log('Captured Employee ID:', employeeId);
    });

    await test.step('Verify employee created', async () => {
      await pimPage.verifyEmployeeCreated(employee.firstName, employee.lastName);
    });
  });


test('@ui [6] Validate employee appears in employee list with correct details', async ({ page }) => {

  const employee = generateEmployeeName();
    await test.step('Add new employee', async () => {
      
      const employeeId = await pimPage.addEmployee(employee.firstName, employee.lastName);
      console.log('Captured Employee ID:', employeeId);
    

      await test.step('Verify employee created', async () => {
        await pimPage.verifyEmployeeCreated(employee.firstName, employee.lastName);
      });
      
      await test.step('Go to Employee List', async () => {
          await pimPage.goToEmployeeList();
      });

      await test.step('Search employee by ID', async () => {
          await pimPage.searchEmployeeById(employeeId);
      });

      await test.step('Verify employee details', async () => {
          await pimPage.verifyEmployeeInList(employee.firstName, employee.lastName, employeeId);
          await pimPage.verifyEmployeeExists('(1) Record Found')
      });
    });
  });
});