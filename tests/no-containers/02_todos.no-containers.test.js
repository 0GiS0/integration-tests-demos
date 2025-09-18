// 02_todos.no-containers.test.js (sin contenedores)
// Requiere Postgres local disponible en las credenciales definidas en 01_setEnv.js
import request from "supertest";
import { initDb, closePool } from "../../src/db.js";
import app from "../../src/app.js";

beforeAll(async () => {
  await initDb();
}, 120000);

afterAll(async () => {
  await closePool();
}, 120000);

it("NO-CONTAINERS: GET /health devuelve ok", async () => {
  const res = await request(app).get("/health").expect(200);
  expect(res.body).toEqual({ status: "ok" });
});

it("NO-CONTAINERS: POST /todos crea y GET /todos incluye la tarea creada", async () => {
  const title = `NoContainers Task ${Date.now()}`;
  const postRes = await request(app).post("/todos").send({ title }).expect(201);
  expect(postRes.body).toMatchObject({ title, completed: false });

  const getRes = await request(app).get("/todos").expect(200);
  const found = getRes.body.find((t) => t.title === title);
  expect(found).toBeTruthy();
});

it("NO-CONTAINERS: GET /todos devuelve array de todos", async () => {
  const getRes = await request(app).get("/todos").expect(200);
  expect(Array.isArray(getRes.body)).toBe(true);
});
