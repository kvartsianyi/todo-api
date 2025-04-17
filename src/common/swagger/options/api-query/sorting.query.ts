import { ApiQueryOptions } from '@nestjs/swagger';

import { SortOrderEnum } from '@/common/constants';

export const orderByQuery: ApiQueryOptions = {
  name: 'orderBy',
  required: false,
  schema: {
    type: 'string',
    enum: Object.values(SortOrderEnum),
  },
  description: 'Order direction',
} as const;

export const createSortByQuery = (fields: string[]): ApiQueryOptions => ({
  name: 'sortBy',
  required: false,
  schema: {
    type: 'string',
    enum: fields,
  },
  description: 'Sort by field',
});
