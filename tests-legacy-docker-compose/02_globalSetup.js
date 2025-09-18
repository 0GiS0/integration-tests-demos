// 02_globalSetup.js
import { execSync } from 'node:child_process';
import net from 'node:net';
import { Client } from 'pg';

function waitForPort(host, port, timeoutMs = 60000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function tryOnce() {
      const socket = net.connect(port, host);
      let resolved = false;
      socket
        .on('connect', () => {
          resolved = true;
          socket.end();
          resolve();
        })
        .on('error', () => {
          socket.destroy();
          if (Date.now() - start > timeoutMs) reject(new Error('Timeout waiting for DB'));
          else setTimeout(tryOnce, 500);
        })
        .on('timeout', () => {
          socket.destroy();
          if (!resolved) {
            if (Date.now() - start > timeoutMs) reject(new Error('Timeout waiting for DB'));
            else setTimeout(tryOnce, 500);
          }
        });
      socket.setTimeout(3000);
    })();
  });
}

export default async () => {
  // Start Postgres via docker compose
  execSync('docker compose -f docker-compose.legacy.yml up -d', {
    stdio: 'inherit',
  });
  // Wait for mapped port 5434
  await waitForPort('127.0.0.1', 5434);
  // Additionally, wait until Postgres accepts connections
  const connectionString = 'postgres://postgres:postgres@127.0.0.1:5434/postgres';
  const start = Date.now();
  const timeoutMs = 60000;
  // retry loop with explicit condition
  let ready = false;
  while (!ready && (Date.now() - start <= timeoutMs)) {
    const client = new Client({ connectionString });
    try {
      await client.connect();
      await client.query('SELECT 1');
      await client.end();
      ready = true; // ready
    } catch (e) {
      try { await client.end(); } catch (endErr) { console.error('Error closing Postgres client:', endErr); }
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  if (!ready) {
    throw new Error('Timeout waiting for Postgres to be ready');
  }
};
