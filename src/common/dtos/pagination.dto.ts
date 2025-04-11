import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_SIZE,
  PAGINATION_MAX_SIZE,
  PAGINATION_MIN_PAGE,
  PAGINATION_MIN_SIZE,
} from '../constants';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION_MIN_PAGE)
  public readonly page?: number = PAGINATION_DEFAULT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION_MIN_SIZE)
  @Max(PAGINATION_MAX_SIZE)
  public readonly size?: number = PAGINATION_DEFAULT_SIZE;
}
