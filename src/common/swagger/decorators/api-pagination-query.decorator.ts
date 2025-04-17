import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { pageQuery, pageSizeQuery } from '../options';

export function ApiPaginationQuery() {
  return applyDecorators(ApiQuery(pageQuery), ApiQuery(pageSizeQuery));
}
