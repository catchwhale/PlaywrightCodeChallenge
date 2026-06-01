import { ApiClient } from '../clients/ApiClient';
import { env } from '../../config/env';

export class EmployeeApi extends ApiClient {

  async getEmployees(
    limit = 50,
    offset = 0
  ) {
    return await this.apiContext.get(
      `${env.baseURL}/web/index.php/api/v2/pim/employees`,
      {
        params: {
          limit,
          offset,
          model: 'detailed',
          includeEmployees: 'onlyCurrent',
          sortField: 'employee.firstName',
          sortOrder: 'ASC'
        }
      }
    );
  }

  async getEmployeeById(employeeId: string) {
    return await this.apiContext.get(
      `${env.baseURL}/web/index.php/api/v2/pim/employees/${employeeId}`
    );
  }
}