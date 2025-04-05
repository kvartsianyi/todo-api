import { IsString, Length } from 'class-validator';

import { TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from '../constants';
import { Transform } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)
  @Transform(({ value }) => value.trim())
  public readonly title: string;
}
