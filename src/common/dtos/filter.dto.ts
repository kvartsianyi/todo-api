import { Transform, Type } from 'class-transformer';
import { IsInt, Min, Max, IsOptional, IsIn, IsString } from 'class-validator';

import {
  PAGINATION_DEFAULT_SIZE,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_MAX_SIZE,
  PAGINATION_MIN_SIZE,
  PAGINATION_MIN_PAGE,
  SortOrderEnum,
  SORTING_DEFAULT_DIRECTION,
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

export class SortingDto {
  @IsOptional()
  @IsString()
  public readonly sortBy?: string;

  @IsOptional()
  @IsIn(Object.values(SortOrderEnum))
  @Transform(({ value }) => value?.toUpperCase() || SORTING_DEFAULT_DIRECTION, {
    toClassOnly: true,
  })
  public readonly orderBy?: SortOrderEnum = SortOrderEnum.ASC;
}
