import { ApiPropertyOptions } from '@nestjs/swagger';

export const jwtTokenProperty: ApiPropertyOptions = {
  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQs...',
  description: 'Jwt token',
} as const;
