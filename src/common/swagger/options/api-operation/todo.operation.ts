import { ApiOperationOptions } from '@nestjs/swagger';

export const getTodosOperation: ApiOperationOptions = {
  summary: 'Get Todos',
  description: 'Get all todos. Include pagination, sorting and filtering.',
} as const;

export const getTodoByIdOperation: ApiOperationOptions = {
  summary: 'Get Todo By Id',
  description: 'Get todo by id',
} as const;

export const createTodoOperation: ApiOperationOptions = {
  summary: 'Create Todo',
  description: 'Create todo',
} as const;

export const patchTodoOperation: ApiOperationOptions = {
  summary: 'Update Todo fields',
  description: 'Update one or few todo fields',
} as const;

export const deleteTodoOperation: ApiOperationOptions = {
  summary: 'Delete Todo By Id',
  description: 'Delete todo by id',
} as const;
