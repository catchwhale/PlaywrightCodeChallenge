import { test, expect } from '../../fixtures/test-fixtures';

test('Get employee by ID using API service layer @api', async ({ employeeAPI }) => {

  const employeeId = '0001';

  const data = await employeeAPI.getEmployeeById(employeeId);

  console.log(data);

  // Assertions
  expect(data.data.employeeId).toBe(employeeId);
  expect(data.data.firstName).toBeTruthy();
  expect(data.data.lastName).toBeTruthy();
});