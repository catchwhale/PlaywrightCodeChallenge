import { Page, expect } from '@playwright/test';

export class PIMPage {
  constructor(private page: Page) {}

  async clickAddEmployee() {
    await this.page.getByRole('button', { name: 'Add' }).click();
  }
  async clickSaveEmployee() {
     await this.page.getByRole('button', { name: 'Save' }).click();
  }
  async addEmployee(firstName: string, lastName: string) {
    await this.clickAddEmployee();
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);

    // Employee ID field (capture auto-generated value)

    const employeeId = await this.page.locator("//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]//input").inputValue();

    await this.clickSaveEmployee();

    return employeeId;
  }
  async goToEmployeeList() {
    await this.page.getByRole('link', { name: 'Employee List' }).click();
  }

  async searchEmployeeById(employeeId: string) {
     const employeeIdInput = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');

    await employeeIdInput.fill(employeeId);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifyEmployeeInList(firstName: string, lastName: string, employeeId: string) {
    // await this.searchEmployeeById(employeeId)
    await expect(this.page.getByText(employeeId)).toBeVisible();
    await expect(this.page.getByText(firstName)).toBeVisible();
    await expect(this.page.getByText(lastName)).toBeVisible();
  }

   async verifyEmployeeExists(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }


  async verifyEmployeeCreated(firstName: string, lastName: string) {
    const fullName = `${firstName} ${lastName}`;

    await expect(
      this.page.getByText(fullName, { exact: true })
    ).toBeVisible();
  }

  async getEmployeeDetails() {
    const employeeId = await this.page
      .locator('input')
      .filter({ has: this.page.locator('label:text("Employee Id")') })
      .inputValue();

    const firstName = await this.page
      .locator('input[name="firstName"]')
      .inputValue();

    const lastName = await this.page
      .locator('input[name="lastName"]')
      .inputValue();

    const jobTitle = await this.page
      .locator('.orangehrm-edit-employee-content')
      .textContent();

    return {
      employeeId,
      fullName: `${firstName} ${lastName}`,
      jobTitle
    };
  }
}