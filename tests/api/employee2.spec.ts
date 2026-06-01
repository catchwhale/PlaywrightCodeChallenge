
import { generateEmployeeName } from '../../utils/randomData';
import { PIMPage } from '../../pages/PIMPage';
import { env } from '../..//config/env';
import { EmployeeService } from '../../api/services/employeeService';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';


import { test, expect } from '../../fixtures/apiFixtures';

test.describe('API Module Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let pimPage: PIMPage;

  let firstName: string;
  let lastName: string;
  let employeeId: string;
  // test.beforeEach(async ({ page }) => {
  //   loginPage = new LoginPage(page);
  //   dashboardPage = new DashboardPage(page);
  //   pimPage = new PIMPage(page);

  //   const employee = generateEmployeeName();
  //   firstName = employee.firstName;
  //   lastName = employee.lastName;

  //   await loginPage.gotoURL('/web/index.php/pim/viewEmployeeList');
  //   await loginPage.verifysubURL('/web/index.php/pim/viewEmployeeList');

  // });

test.only('@api [1] Fetch the employee list using OrangeHRM API call', async ({ employeeApi }) => {

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
  
});



test('@api [2] Verify search for the employee created in UI using Employee ID', async ({page, employeeApi }) => {

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

test('@api [3] Validate that UI data matches API response (name, job title, employee ID)',
  async ({ page, employeeApi }) => {
    // await page.goto(env.baseURL);
    // =========================
    // STEP 0: CREATE EMPLOYEE
    // =========================

    const pimPage = new PIMPage(page);
    const employeeService = new EmployeeService(employeeApi);

    const employee = generateEmployeeName();
    const employeeId = await pimPage.addEmployee(
      employee.firstName,
      employee.lastName
    );

    // =========================
    // STEP 1: GET DATA FROM API
    // =========================

    const apiEmployee = 
      await employeeService.getEmployee(employeeId);

    console.log('API DATA:', apiEmployee);

//     // =========================
//     // STEP 2: GET DATA FROM UI
//     // =========================

//     await page.goto(
//       `${env.baseURL}/web/index.php/pim/viewEmployeeList`
//     );

//     // Search employee
//     await page.fill(
//       'input[placeholder="Search"]',
//       employeeId
//     );

//     await page.click(
//       'button[type="submit"]'
//     );

//     // Open employee record
//     await page.click(
//       `text=${employeeId}`
//     );

//     // =========================
//     // STEP 3: EXTRACT UI VALUES
//     // =========================

//     const uiEmployeeId =
//       await page
//         .locator(
//           '//label[text()="Employee Id"]/../following-sibling::div'
//         )
//         .textContent();

//     const uiFirstName =
//       await page
//         .locator('//input[@name="firstName"]')
//         .inputValue();

//     const uiLastName =
//       await page
//         .locator('//input[@name="lastName"]')
//         .inputValue();

//     const uiJobTitle =
//       await page
//         .locator(
//           '//label[text()="Job Title"]/../following-sibling::div'
//         )
//         .textContent();

//     // =========================
//     // STEP 4: ASSERTIONS
//     // =========================

//     expect(uiEmployeeId?.trim())
//       .toBe(apiEmployee.employeeId);

//     expect(uiFirstName)
//       .toBe(apiEmployee.firstName);

//     expect(uiLastName)
//       .toBe(apiEmployee.lastName);

//     if (apiEmployee.jobTitle) {
//       expect(uiJobTitle?.trim())
//         .toBe(apiEmployee.jobTitle);
//     }
  
  });

test.only('@api [11] Fetch the employee list using OrangeHRM API call', async ({ employeeApi }) => {

    // const response = await employeeApi.getEmployeeById('603');
    // // expect(response.ok()).toBeTruthy();
    // const body = await response.json();
    // console.log(body)

    const response = await employeeApi.getEmployees();

    expect(response.status()).toBe(200);

    const body = await response.json();
    const empNumbers = body.map(emp => emp.empNumber);

    console.log(empNumbers);
  });
});