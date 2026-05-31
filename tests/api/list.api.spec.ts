import { test, expect, request } from '@playwright/test';
import { generateEmployeeName } from '../../utils/randomData';
import { PIMPage } from '../../pages/PIMPage';

test('@api [1]Fetch the employee list using OrangeHRM API call', async () => {

  // Load saved login session
  const apiContext = await request.newContext({
    storageState: 'storageState.json',
  });

  // 📡 API request
  const response = await apiContext.get(
    'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC'
  );

  // 1. Status validation (basic but required)
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const data = await response.json();

  // 2. Response structure validation
  expect(data).toHaveProperty('data');
  expect(Array.isArray(data.data)).toBeTruthy();

  // 3. Ensure list is not empty
  expect(data.data.length).toBeGreaterThan(0);

  // 4. Validate first employee object structure
  const firstEmployee = data.data[0];

  expect(firstEmployee).toHaveProperty('employeeId');
  expect(firstEmployee).toHaveProperty('firstName');
  expect(firstEmployee).toHaveProperty('lastName');

  // 5. Business rule check (real-world validation)
  expect(firstEmployee.firstName).not.toBeNull();
  expect(firstEmployee.lastName).not.toBeNull();

  // 6. Check pagination metadata (if available)
  if (data.meta) {
    expect(data.meta).toHaveProperty('total');
    expect(data.meta.total).toBeGreaterThan(0);
  }
});


test.only('@api [2]Verify search for the employee created in UI using Employee ID', async ({ page }) => {

  // Reuse authenticated session
  const apiContext = await request.newContext({
    storageState: 'storageState.json',
  });
  // Login UI
  // Create employee UI
  const pimPage = new PIMPage(page);
  const employee = generateEmployeeName();
  const firstName = employee.firstName;
  const lastName = employee.lastName;

  const employeeId = await pimPage.addEmployee(firstName, lastName);
  // Replace this with actual Employee ID from UI creation test
  // const employeeId = '0001';

  // 📡 API request (search employee)
  const response = await apiContext.get(
    `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${employeeId}`
  );

  // 1. Status check
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const data = await response.json();

  console.log(data);

  // 2. Validate response structure
  expect(data).toHaveProperty('data');

  // 3. Validate employee exists
  expect(data.data).not.toBeNull();

  // 4. Validate Employee ID matches request
  expect(data.data.employeeId).toBe(employeeId);

  // 5. Validate essential fields
  expect(data.data.firstName).toBeTruthy();
  expect(data.data.lastName).toBeTruthy();
});


test('@api [3]Validate that UI data matches API response (name, job title, employee ID)', async ({ page }) => {

  // API context with session
  const apiContext = await request.newContext({
    storageState: 'storageState.json',
  });

  // Login UI
  // Create employee UI
  const pimPage = new PIMPage(page);
  const employee = generateEmployeeName();
  const firstName = employee.firstName;
  const lastName = employee.lastName;

  const employeeId = await pimPage.addEmployee(firstName, lastName);

  // =========================
  // STEP 1: GET DATA FROM API
  // =========================
  const apiResponse = await apiContext.get(
    `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${employeeId}`
  );

  expect(apiResponse.status()).toBe(200);

  const apiData = await apiResponse.json();
  const apiEmployee = apiData.data;

  console.log('API DATA:', apiEmployee);

  // =========================
  // STEP 2: GET DATA FROM UI
  // =========================
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');

  // Search employee
  await page.fill('input[placeholder="Search"]', employeeId);
  await page.click('button[type="submit"]');

  // Open employee record
  await page.click(`text=${employeeId}`);

  // Extract UI values
  const uiEmployeeId = await page.locator('//label[text()="Employee Id"]/../following-sibling::div').textContent();
  const uiFirstName = await page.locator('//input[@name="firstName"]').inputValue();
  const uiLastName = await page.locator('//input[@name="lastName"]').inputValue();
  const uiJobTitle = await page.locator('//label[text()="Job Title"]/../following-sibling::div').textContent();

  // =========================
  // STEP 3: ASSERTIONS (UI vs API)
  // =========================

  // Employee ID match
  expect(uiEmployeeId?.trim()).toBe(apiEmployee.employeeId);

  // First Name match
  expect(uiFirstName).toBe(apiEmployee.firstName);

  // Last Name match
  expect(uiLastName).toBe(apiEmployee.lastName);

  // Job Title match (depends on API field availability)
  if (apiEmployee.jobTitle) {
    expect(uiJobTitle?.trim()).toBe(apiEmployee.jobTitle);
  }

});