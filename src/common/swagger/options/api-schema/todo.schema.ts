import { ApiSchemaOptions } from '@nestjs/swagger';

export const createTodoSchema: ApiSchemaOptions = {
  name: 'Create Todo schema',
  description: 'Schema for todo creation',
};

export const updateTodoSchema: ApiSchemaOptions = {
  name: 'Update Todo schema',
  description: 'Schema for todo update',
};

export const todoEntitySchema: ApiSchemaOptions = {
  name: 'Todo schema',
  description: 'Schema for todo',
};
