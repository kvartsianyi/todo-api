import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';

import { PaginationDto } from '../dtos';
import { ValidationException } from '../exceptions';
import { PAGINATION_VALIDATION_EXCEPTION_MESSAGE } from '../constants';

export const PaginationQuery = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<PaginationDto> => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = req.query.page;
    const size = req.query.size;
    const pagination = { page, size };

    const paginationDto = plainToInstance(PaginationDto, pagination);
    const errors = await validate(paginationDto);

    if (errors.length) {
      throw new ValidationException(
        PAGINATION_VALIDATION_EXCEPTION_MESSAGE,
        errors,
      );
    }

    return paginationDto;
  },
);
