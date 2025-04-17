import { ApiPropertyOptions } from '@nestjs/swagger';

import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_SIZE,
} from '@/common/constants';

export const pageProperty: ApiPropertyOptions = {
  example: PAGINATION_DEFAULT_PAGE,
  description: 'Current page',
} as const;

export const pageSizeProperty: ApiPropertyOptions = {
  example: PAGINATION_DEFAULT_SIZE,
  description: 'Page size',
} as const;
