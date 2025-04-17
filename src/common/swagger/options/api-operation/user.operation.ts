import { ApiOperationOptions } from '@nestjs/swagger';

export const getProfileOperation: ApiOperationOptions = {
  summary: 'Current User Profile',
  description: 'Profile of current user',
} as const;
