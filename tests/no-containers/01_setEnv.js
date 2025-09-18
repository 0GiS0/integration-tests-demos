// 01_setEnv.js (sin contenedores)
// En devcontainer usamos el hostname 'postgres' del docker-compose
// En CI de GitHub Actions usará 127.0.0.1:5432
process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@postgres:5432/postgres";
