import { IsString, Length } from 'class-validator';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../constants';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

import {
  passwordProperty,
  registerSchema,
  usernameProperty,
} from '@/common/swagger/options';

@ApiSchema(registerSchema)
export class RegisterUserDto {
  @ApiProperty(usernameProperty)
  @IsString()
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  username: string;

  @ApiProperty(passwordProperty)
  @IsString()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  password: string;
}
