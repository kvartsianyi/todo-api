import { ApiOperationOptions } from '@nestjs/swagger';

export const registrationOperation: ApiOperationOptions = {
  summary: 'Registration',
  description: 'Registration of user',
} as const;

export const loginOperation: ApiOperationOptions = {
  summary: 'Login',
  description: 'Login to the app',
} as const;

export const tokenRefreshOperation: ApiOperationOptions = {
  summary: 'Refresh Token',
  description: 'Refresh access token',
} as const;
