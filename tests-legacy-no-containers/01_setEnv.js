// 01_setEnv.js (sin contenedores)
// Requiere que tengas un Postgres local escuchando en 5432
// Ajusta estas variables si tu entorno es distinto.
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/postgres';
