import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

import { TodoStatusEnum } from '../constants';

export class UpdateTodoDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status?: TodoStatusEnum;
}
