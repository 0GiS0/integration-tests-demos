import { z } from 'zod';

export const todoSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required').max(255),
  completed: z.boolean().default(false),
  created_at: z.date().or(z.string()),
});

export const createTodoSchema = todoSchema
  .pick({
    title: true,
  })
  .extend({
    completed: z.boolean().optional(),
  });

export const updateTodoSchema = todoSchema.partial();

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodo = z.infer<typeof createTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
