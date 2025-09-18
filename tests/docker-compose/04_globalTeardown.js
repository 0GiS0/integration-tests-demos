// 04_globalTeardown.js
import { execSync } from "node:child_process";

export default async () => {
  execSync(
    "docker compose -f tests/docker-compose/docker-compose.yml down -v",
    {
      stdio: "inherit",
    }
  );
};
