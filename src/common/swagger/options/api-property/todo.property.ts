import { TodoStatusEnum } from '@/todo/constants';
import { ApiPropertyOptions } from '@nestjs/swagger';

export const todoTitleProperty: ApiPropertyOptions = {
  example: 'Complete task',
  description: 'Todo title',
} as const;

export const todoDescriptionProperty: ApiPropertyOptions = {
  example: 'I need to complete task',
  description: 'Todo description',
} as const;

export const todoStatusProperty: ApiPropertyOptions = {
  example: 'todo',
  description: 'Todo status',
  enum: TodoStatusEnum,
} as const;

export const todoDueAtProperty: ApiPropertyOptions = {
  example: '2025-03-29T14:14:56.355Z',
  description: 'Todo deadline',
} as const;

export const todoOwnerProperty: ApiPropertyOptions = {
  example: 1,
  description: 'Todo userId',
} as const;
