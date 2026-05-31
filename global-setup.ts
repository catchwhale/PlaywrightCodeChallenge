import { login } from './utils/auth';

async function globalSetup() {
  // reusable login function
  await login();
}

export default globalSetup;