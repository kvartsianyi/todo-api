import { Type } from 'class-transformer';
import { IsInt, Min, Max, IsOptional } from 'class-validator';

import { DEFAULT_LIMIT, MAX_LIMIT } from '../constants';

export class PaginationDto {
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @IsInt({ message: 'Skip must be an integer' })
  skip?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(MAX_LIMIT, { message: `Limit cannot exceed ${MAX_LIMIT}` })
  limit?: number = DEFAULT_LIMIT;
}
