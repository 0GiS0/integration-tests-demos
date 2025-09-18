// 03_todos.legacy.docker-compose.test.js
// Prueba de integración usando docker-compose (sin Testcontainers)
import request from 'supertest';
import { initDb, closePool } from '../src/db.js';
import app from '../src/app.js';

beforeAll(async () => {
  await initDb();
}, 120000);

afterAll(async () => {
  await closePool();
}, 120000);

it('LEGACY-DC: POST /todos then GET /todos should include created todo', async () => {
  const title = `Legacy-DC Task ${Date.now()}`;
  const postRes = await request(app).post('/todos').send({ title }).expect(201);
  expect(postRes.body).toMatchObject({ title, completed: false });

  const getRes = await request(app).get('/todos').expect(200);
  const found = getRes.body.find((t) => t.title === title);
  expect(found).toBeTruthy();
});
