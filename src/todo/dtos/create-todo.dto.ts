import { IsDate, IsOptional, IsString, Length } from 'class-validator';

import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from '../constants';
import { Transform, Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)
  @Transform(({ value }) => value.trim())
  public readonly title: string;

  @IsOptional()
  @IsString()
  @Length(DESCRIPTION_MIN_LENGTH, DESCRIPTION_MAX_LENGTH)
  @Transform(({ value }) => value.trim())
  public readonly description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public readonly dueAt?: Date;
}
