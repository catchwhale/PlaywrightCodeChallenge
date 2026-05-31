import { test, expect } from '../../fixtures/test-fixtures';

test('@api [2]Search for the employee created in UI using Employee ID', async ({ employeeAPI }) => {

  const employeeId = '0001';

  const data = await employeeAPI.getEmployeeById(employeeId);

  console.log(data);

  // Assertions
  expect(data.data.employeeId).toBe(employeeId);
  expect(data.data.firstName).toBeTruthy();
  expect(data.data.lastName).toBeTruthy();
});