import { ApiPropertyOptions } from '@nestjs/swagger';

export const usernameProperty: ApiPropertyOptions = {
  example: 'John',
  description: 'Unique username',
} as const;

export const passwordProperty: ApiPropertyOptions = {
  example: 'Qwerty123',
  description: 'Password of user',
} as const;
