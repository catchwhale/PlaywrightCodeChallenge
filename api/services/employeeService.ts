import { Employee } from '../models/Employee';
import { EmployeeApi } from '../endpoints/EmployeeApi';

export class EmployeeService {

  constructor(
    private employeeApi: EmployeeApi
  ) {}

  async createAndVerifyEmployee(
    employeeId: string
  ) {

    const response =
      await this.employeeApi.getEmployeeById(employeeId);

    return await response.json();
  }

  async getEmployee(employeeId: string): Promise<Employee> {
    const response =
    await this.employeeApi.getEmployeeById(employeeId);

    if (!response.ok()) {
        throw new Error(
            `Failed to fetch employee. Status: ${response.status()}`
            );
        }

    const body = await response.json();
    return body.data as Employee;
    }
}