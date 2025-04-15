import { FilterTypeEnum } from '@/common/constants';
import { QueryFilterFieldOptions } from '@/common/interfaces';

export enum TodoStatusEnum {
  TODO = 'todo',
  COMPLETED = 'completed',
}

export const TODO_SORTABLE_FIELDS: string[] = ['title'] as const;
export const TODO_FILTERABLE_FIELDS: Record<string, QueryFilterFieldOptions> = {
  id: {
    type: FilterTypeEnum.NUMBER,
  },
  title: {
    type: FilterTypeEnum.STRING,
  },
  status: {
    type: FilterTypeEnum.ENUM,
    enum: Object.values(TodoStatusEnum),
  },
  createdAt: {
    type: FilterTypeEnum.DATE,
  },
  dueAt: {
    type: FilterTypeEnum.DATE,
  },
} as const;

export const TITLE_MIN_LENGTH = 3;
export const TITLE_MAX_LENGTH = 50;

export const DESCRIPTION_MIN_LENGTH = 3;
export const DESCRIPTION_MAX_LENGTH = 100;
