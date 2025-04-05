import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { SortingDto } from '../dtos';
import { SORT_ERRORS } from '../constants';

export const SortingQuery = createParamDecorator(
  async (
    sortableFields: string[],
    ctx: ExecutionContext,
  ): Promise<SortingDto> => {
    const req: Request = ctx.switchToHttp().getRequest();
    const { sortBy, orderBy } = req.query;
    const sorting = { sortBy, orderBy };

    const sortingDto = plainToInstance(SortingDto, sorting);
    const errors = await validate(sortingDto);

    if (sortBy && !sortableFields?.includes(sortBy as string)) {
      throw new BadRequestException(
        SORT_ERRORS.FIELD_IS_NOT_SORTABLE(sortableFields),
      );
    }

    if (errors.length) {
      const errorMessages = errors.reduce(
        (acc, { constraints }) =>
          constraints ? [...acc, ...Object.values(constraints)] : acc,
        [],
      );
      throw new BadRequestException(errorMessages);
    }

    return sortingDto;
  },
);
