import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';

import { SORTING_DEFAULT_DIRECTION, SortOrderEnum } from '../constants';

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
