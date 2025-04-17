import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

import { TodoEntity } from '@/todo/todo.entity';
import { PaginatedResourceDto } from '@/common/dtos';

export const getTodosSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Successfully returned todos.',
  type: PaginatedResourceDto<TodoEntity>,
  example: {
    data: [
      {
        id: 1,
        createdAt: '2025-04-05T19:43:18.144Z',
        updatedAt: '2025-04-15T14:05:19.021Z',
        title: 'It is todo!',
        description: 'description updated!',
        status: 'completed',
        userId: 1,
        dueAt: '2025-04-22T14:14:19.355Z',
      },
    ],
    page: 1,
    size: 10,
    total: 1,
  },
} as const;

export const getTodoByIdSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Successfully returned todo.',
  type: TodoEntity,
  example: {
    title: 'title',
    description: 'some desc',
    dueAt: '2025-04-22T14:14:19.355Z',
    userId: 1,
    id: 1,
    createdAt: '2025-04-17T12:08:08.021Z',
    updatedAt: '2025-04-17T12:08:08.021Z',
    status: 'todo',
  },
} as const;

export const createTodoSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Successfully created todo.',
  type: TodoEntity,
  example: {
    title: 'title',
    description: 'some desc',
    dueAt: '2025-04-22T14:14:19.355Z',
    userId: 1,
    id: 1,
    createdAt: '2025-04-17T12:08:08.021Z',
    updatedAt: '2025-04-17T12:08:08.021Z',
    status: 'todo',
  },
} as const;

export const patchTodoSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Successfully patched todo.',
  type: TodoEntity,
  example: {
    title: 'title updated',
    description: 'some desc updated',
    dueAt: '2025-04-22T14:14:19.355Z',
    userId: 1,
    id: 1,
    createdAt: '2025-04-17T12:08:08.021Z',
    updatedAt: '2025-04-17T12:08:08.021Z',
    status: 'completed',
  },
} as const;

export const deleteTodoSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Todo deleted successfully.',
} as const;
