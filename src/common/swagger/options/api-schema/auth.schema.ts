import { ApiSchemaOptions } from '@nestjs/swagger';

export const registerSchema: ApiSchemaOptions = {
  name: 'Registration schema',
  description: 'Schema for registration',
};

export const loginSchema: ApiSchemaOptions = {
  name: 'Login schema',
  description: 'Schema for login',
};

export const jwtTokenPairSchema: ApiSchemaOptions = {
  name: 'Jwt token pair',
  description: 'Jwt token pair schema. Include access and refresh token.',
};
