// Prueba de integración con TEST-CONTAINERS (Postgres efímero)
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import request from "supertest";
import { initDb, closePool } from "../../src/db.js";
import app from "../../src/app.js";

let container;

beforeAll(async () => {
  container = await new PostgreSqlContainer("postgres:16-alpine").start();
  const uri = container.getConnectionUri();
  process.env.DATABASE_URL = uri;
  await initDb();
}, 120000);

afterAll(async () => {
  await closePool();
  if (container) {
    await container.stop();
  }
}, 120000);

it("TEST-CONTAINERS: GET /health devuelve ok", async () => {
  const res = await request(app).get("/health").expect(200);
  expect(res.body).toEqual({ status: "ok" });
});

it("TEST-CONTAINERS: POST /todos crea y GET /todos incluye la tarea creada", async () => {
  const title = `Task ${Date.now()}`;
  const postRes = await request(app).post("/todos").send({ title }).expect(201);
  expect(postRes.body).toMatchObject({ title, completed: false });

  const getRes = await request(app).get("/todos").expect(200);
  const found = getRes.body.find((t) => t.title === title);
  expect(found).toBeTruthy();
});

it("TEST-CONTAINERS: GET /todos devuelve array de todos", async () => {
  const getRes = await request(app).get("/todos").expect(200);
  expect(Array.isArray(getRes.body)).toBe(true);
});
