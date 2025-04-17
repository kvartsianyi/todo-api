import { ApiSchemaOptions } from '@nestjs/swagger';

export const paginationSchema: ApiSchemaOptions = {
  name: 'Pagination schema',
  description: 'Schema for pagination',
};

export const paginatedResourceSchema: ApiSchemaOptions = {
  name: 'Paginated Resource schema',
  description: 'Schema for paginated resource',
};
