import { Page, expect } from '@playwright/test';

export class PIMPage {
  constructor(private page: Page) {}

  async clickAddEmployee() {
    await this.page.getByRole('button', { name: 'Add' }).click();
  }

  async addEmployee(firstName: string, lastName: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);

    // Employee ID field (capture auto-generated value)
    const employeeIdInput = this.page.locator(
      'input.oxd-input.oxd-input--active'
    ).first();

    const employeeId = await employeeIdInput.inputValue();

    await this.page.getByRole('button', { name: 'Save' }).click();

    return employeeId;
  }
  async goToEmployeeList() {
    await this.page.getByRole('link', { name: 'Employee List' }).click();
  }

  async searchEmployeeById(employeeId: string) {
    await this.page.getByPlaceholder('Type for hints...').first().fill(employeeId);

    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifyEmployeeInList(firstName: string, lastName: string, employeeId: string) {
    await expect(this.page.getByText(employeeId)).toBeVisible();
    await expect(this.page.getByText(firstName)).toBeVisible();
    await expect(this.page.getByText(lastName)).toBeVisible();
  }

  async verifyEmployeeCreated(firstName: string, lastName: string) {
    const fullName = `${firstName} ${lastName}`;

    await expect(
      this.page.getByText(fullName, { exact: true })
    ).toBeVisible();
  }
}