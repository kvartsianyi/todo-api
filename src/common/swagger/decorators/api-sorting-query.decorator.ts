import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { createSortByQuery, orderByQuery } from '../options';

export function ApiSortingQuery(sortableFields: string[]) {
  return applyDecorators(
    ApiQuery(orderByQuery),
    ApiQuery(createSortByQuery(sortableFields)),
  );
}
