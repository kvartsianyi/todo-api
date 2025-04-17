import { STATUS_CODES } from 'node:http';
import { HttpStatus } from '@nestjs/common';
import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

import { DEFAULT_VALIDATION_EXCEPTION_MESSAGE } from '@/common/constants';

export const notFoundResponse: ApiResponseNoStatusOptions = {
  description: 'Resource not found',
  example: {
    statusCode: HttpStatus.NOT_FOUND,
    message: STATUS_CODES[HttpStatus.NOT_FOUND],
  },
};

export const validationErrorResponse: ApiResponseNoStatusOptions = {
  description: 'Validation error response',
  example: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: DEFAULT_VALIDATION_EXCEPTION_MESSAGE,
    errors: [
      {
        property: 'property',
        errors: ['error description'],
      },
    ],
  },
} as const;
