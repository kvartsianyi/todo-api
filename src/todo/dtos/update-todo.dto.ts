import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

import {
  TodoStatusEnum,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from '../constants';
import { IsDateFormat } from '@/common/decorators';
import {
  INVALID_ISO8601_FORMAT_ERROR,
  ISO_8601_UTC_REGEX,
} from '@/common/constants';

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
  @IsDateFormat(ISO_8601_UTC_REGEX, {
    message: INVALID_ISO8601_FORMAT_ERROR,
  })
  public readonly dueAt?: Date;
}
