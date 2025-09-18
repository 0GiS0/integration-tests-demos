// Prueba de integración usando docker-compose (sin Testcontainers)
import request from "supertest";
import { initDb, closePool } from "../../src/db.js";
import app from "../../src/app.js";

beforeAll(async () => {
  await initDb();
}, 120000);

afterAll(async () => {
  await closePool();
}, 120000);

it("El endpoint /health devuelve ok", async () => {
  const res = await request(app).get("/health").expect(200);
  expect(res.body).toEqual({ status: "ok" });
});

it("Si creo una tarea debería poder recuperar la misma", async () => {
  const title = `DC Task ${Date.now()}`;
  const postRes = await request(app).post("/todos").send({ title }).expect(201);
  expect(postRes.body).toMatchObject({ title, completed: false });

  const getRes = await request(app).get("/todos").expect(200);
  const found = getRes.body.find((t) => t.title === title);
  expect(found).toBeTruthy();
});
