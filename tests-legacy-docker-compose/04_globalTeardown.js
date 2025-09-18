// 04_globalTeardown.js
import { execSync } from 'node:child_process';

export default async () => {
  execSync('docker compose -f docker-compose.legacy.yml down -v', {
    stdio: 'inherit',
  });
};
