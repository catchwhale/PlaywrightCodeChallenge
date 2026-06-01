// config/auth.ts

import fs from 'fs';
import { PATHS } from '../config/paths';

export function ensureAuthDir() {
  if (!fs.existsSync(PATHS.authDir)) {
    fs.mkdirSync(PATHS.authDir, { recursive: true });
  }
}