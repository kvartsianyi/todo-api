import { IsDate, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import {
  TodoStatusEnum,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from '../constants';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)
  @Transform(({ value }) => value.trim())
  public readonly title?: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  public readonly status?: TodoStatusEnum;

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
