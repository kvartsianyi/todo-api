import { ApiQueryOptions } from '@nestjs/swagger';

import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_SIZE,
} from '@/common/constants';

export const pageQuery: ApiQueryOptions = {
  name: 'page',
  required: false,
  type: Number,
  example: PAGINATION_DEFAULT_PAGE,
  description: 'Current page',
} as const;

export const pageSizeQuery: ApiQueryOptions = {
  name: 'size',
  required: false,
  type: Number,
  example: PAGINATION_DEFAULT_SIZE,
  description: 'Page size',
} as const;
