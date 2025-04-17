import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const getProfileSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'User profile',
  example: {
    id: 1,
    username: 'user',
    createdAt: '2025-03-29T11:37:13.574Z',
    updatedAt: '2025-03-29T11:37:13.574Z',
  },
} as const;
