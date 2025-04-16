import { STATUS_CODES } from 'node:http';
import { HttpStatus } from '@nestjs/common';
import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

import { UserEntity } from '@/user/user.entity';
import { USER_ERRORS } from '@/user/constants';
import { DEFAULT_VALIDATION_EXCEPTION_MESSAGE } from '@/common/constants';
import { JwtTokenPairDto } from '@/auth/dtos';
import { LOGIN_BAD_CREDENTIALS } from '@/auth/constants';

export const registrationSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Successfully registered.',
  type: UserEntity,
  example: {
    id: 1,
    username: 'John',
    createdAt: '2025-04-16T13:02:44.593Z',
    updatedAt: '2025-04-16T13:02:44.593Z',
  },
} as const;

export const registrationBadRequestResponse: ApiResponseNoStatusOptions = {
  description: 'Invalid body or user is already registered',
  examples: {
    INVALID_BODY: {
      summary: 'Body validation response',
      value: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: DEFAULT_VALIDATION_EXCEPTION_MESSAGE,
        errors: [
          {
            property: 'username',
            errors: ['username must be longer than or equal to 3 characters'],
          },
        ],
      },
    },
    USER_ALREADY_REGISTERED: {
      summary: 'User is already registered',
      value: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: USER_ERRORS.USERNAME_ALREADY_TAKEN,
        errors: [],
      },
    },
  },
} as const;

export const loginSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Successfull login.',
  type: JwtTokenPairDto,
  example: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQs...',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQs...',
  },
} as const;

export const loginBadRequestResponse: ApiResponseNoStatusOptions = {
  description: 'Invalid credentials',
  example: {
    statusCode: HttpStatus.BAD_REQUEST,
    error: STATUS_CODES[HttpStatus.BAD_REQUEST],
    message: LOGIN_BAD_CREDENTIALS,
  },
} as const;

export const jwtTokenInvalidResponse: ApiResponseNoStatusOptions = {
  description: 'Invalid token',
  example: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: STATUS_CODES[HttpStatus.UNAUTHORIZED],
  },
};

export const tokenRefreshSuccessResponse: ApiResponseNoStatusOptions = {
  description: 'Successfully generated new access token.',
  type: JwtTokenPairDto,
  example: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQs...',
  },
} as const;

export const tokenRefreshUnauthorizedResponse: ApiResponseNoStatusOptions = {
  description: 'Invalid refresh token',
  example: jwtTokenInvalidResponse.example,
} as const;
