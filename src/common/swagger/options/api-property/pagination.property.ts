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

export const totalProperty: ApiPropertyOptions = {
  example: 100,
  description: 'Total items count',
} as const;

export const resourceProperty: ApiPropertyOptions = {
  example: [],
  description: 'Resource array',
  isArray: true,
} as const;
