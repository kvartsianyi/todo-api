import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_SIZE,
  PAGINATION_MAX_SIZE,
  PAGINATION_MIN_PAGE,
  PAGINATION_MIN_SIZE,
} from '../constants';
import {
  pageProperty,
  pageSizeProperty,
  paginatedResourceSchema,
  paginationSchema,
} from '../swagger/options';

@ApiSchema(paginationSchema)
export class PaginationDto {
  @ApiPropertyOptional(pageProperty)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION_MIN_PAGE)
  public readonly page?: number = PAGINATION_DEFAULT_PAGE;

  @ApiPropertyOptional(pageSizeProperty)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION_MIN_SIZE)
  @Max(PAGINATION_MAX_SIZE)
  public readonly size?: number = PAGINATION_DEFAULT_SIZE;
}

@ApiSchema(paginatedResourceSchema)
export class PaginatedResourceDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;
}
