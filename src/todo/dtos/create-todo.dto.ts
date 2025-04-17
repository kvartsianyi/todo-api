import { IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from '../constants';
import { IsDateFormat } from '@/common/decorators';
import {
  INVALID_ISO8601_FORMAT_ERROR,
  ISO_8601_UTC_REGEX,
} from '@/common/constants';
import {
  createTodoSchema,
  todoDescriptionProperty,
  todoDueAtProperty,
  todoTitleProperty,
} from '@/common/swagger/options';

@ApiSchema(createTodoSchema)
export class CreateTodoDto {
  @ApiProperty(todoTitleProperty)
  @IsString()
  @Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)
  @Transform(({ value }) => value.trim())
  public readonly title: string;

  @ApiPropertyOptional(todoDescriptionProperty)
  @IsOptional()
  @IsString()
  @Length(DESCRIPTION_MIN_LENGTH, DESCRIPTION_MAX_LENGTH)
  @Transform(({ value }) => value.trim())
  public readonly description?: string;

  @ApiPropertyOptional(todoDueAtProperty)
  @IsOptional()
  @IsDateFormat(ISO_8601_UTC_REGEX, {
    message: INVALID_ISO8601_FORMAT_ERROR,
  })
  public readonly dueAt?: Date;
}
