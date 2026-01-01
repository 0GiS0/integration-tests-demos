import express from 'express';
import todosRouter from './routes/todos';
import type { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/todos', todosRouter);

// Basic error handler
// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
