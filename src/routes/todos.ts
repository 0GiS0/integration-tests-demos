import { Router } from 'express';
import { query } from '../db';
import { createTodoSchema } from '../../schemas/todos.schema';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await query(
      'SELECT id, title, completed, created_at FROM todos ORDER BY id ASC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = createTodoSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: result.error.format() 
      });
    }

    const { title } = result.data;
    const { rows } = await query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed, created_at',
      [title]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
