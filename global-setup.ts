const { chromium } = require('@playwright/test');
const fs = require('fs');
import { login } from './utils/auth';

async function globalSetup() {
  console.log('Global setup started');
  await login();
  console.log('Global setup finished');
}

export default globalSetup;

