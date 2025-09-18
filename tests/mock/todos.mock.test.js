// Prueba con mocks: sin Postgres, sin contenedores.
// Mockeamos la capa de DB (`src/db.js`) para validar la lógica de la API.

import { jest } from "@jest/globals";
import request from "supertest";

// 1) Definimos el mock del módulo ESM antes de importarlo
const queryMock = jest.fn();
const initDbMock = jest.fn();
const closePoolMock = jest.fn();
const getPoolMock = jest.fn();

jest.unstable_mockModule("../../src/db.js", () => ({
  query: queryMock,
  initDb: initDbMock,
  closePool: closePoolMock,
  getPool: getPoolMock,
}));

// 2) Importamos la app después de definir el mock
const { default: app } = await import("../../src/app.js");

beforeEach(() => {
  queryMock.mockReset();
});

it("MOCK: GET /todos devuelve lo que la capa DB indica", async () => {
  const fakeTodos = [
    {
      id: 1,
      title: "A",
      completed: false,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "B",
      completed: true,
      created_at: new Date().toISOString(),
    },
  ];
  queryMock.mockResolvedValueOnce({ rows: fakeTodos });

  const res = await request(app).get("/todos").expect(200);
  expect(res.body).toEqual(fakeTodos);
  expect(Array.isArray(res.body)).toBe(true);
  expect(queryMock).toHaveBeenCalledWith(
    "SELECT id, title, completed, created_at FROM todos ORDER BY id ASC"
  );
});

it("MOCK: GET /health devuelve ok", async () => {
  const res = await request(app).get("/health").expect(200);
  expect(res.body).toEqual({ status: "ok" });
});

it("MOCK: POST /todos crea un todo y lo devuelve", async () => {
  const title = "Nuevo Todo";
  const returned = {
    id: 123,
    title,
    completed: false,
    created_at: new Date().toISOString(),
  };
  queryMock.mockResolvedValueOnce({ rows: [returned] });

  const res = await request(app).post("/todos").send({ title }).expect(201);
  expect(res.body).toEqual(returned);
  expect(queryMock).toHaveBeenCalledWith(
    "INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed, created_at",
    [title]
  );
});
