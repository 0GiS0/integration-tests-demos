// 01_setEnv.js
// Indica a la app que use la BD levantada por docker-compose en el puerto 5435
process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@127.0.0.1:5435/postgres";
