import {
  FILTER_VALIDATION_EXCEPTION_MESSAGE,
  PAGINATION_VALIDATION_EXCEPTION_MESSAGE,
  SORT_VALIDATION_EXCEPTION_MESSAGE,
} from '@/common/constants';
import { HttpStatus } from '@nestjs/common';
import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export const queryParamsBadRequestResponse: ApiResponseNoStatusOptions = {
  description: 'Invalid pagination, sort or filter params',
  examples: {
    PAGINATION_VALIDATION_ERROR: {
      summary: 'Pagination validation Error',
      value: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: PAGINATION_VALIDATION_EXCEPTION_MESSAGE,
        errors: [
          {
            property: 'page',
            errors: ['page must not be less than 1'],
          },
        ],
      },
    },
    SORT_VALIDATION_ERROR: {
      summary: 'Sort validation Error',
      value: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: SORT_VALIDATION_EXCEPTION_MESSAGE,
        errors: [
          {
            property: 'orderBy',
            errors: ['orderBy must be one of the following values: ASC, DESC'],
          },
        ],
      },
    },
    FILTER_VALIDATION_ERROR: {
      summary: 'Filter validation Error',
      value: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: FILTER_VALIDATION_EXCEPTION_MESSAGE,
        errors: [
          {
            property: 'id',
            errors: ['Invalid value provided for eq rule.'],
          },
        ],
      },
    },
  },
} as const;
