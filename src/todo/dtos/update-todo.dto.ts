import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

import {
  TodoStatusEnum,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
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
}
