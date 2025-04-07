import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { SortingDto } from '../dtos';
import { SORT_ERRORS, SORT_VALIDATION_EXCEPTION_MESSAGE } from '../constants';
import { ValidationException } from '../exceptions';

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
      const validationErrors: ValidationError[] = [
        {
          target: sortingDto,
          property: 'sortBy',
          constraints: {
            in: SORT_ERRORS.FIELD_IS_NOT_SORTABLE(sortableFields),
          },
        },
      ];

      throw new ValidationException(
        SORT_VALIDATION_EXCEPTION_MESSAGE,
        validationErrors,
      );
    }

    if (errors.length) {
      throw new ValidationException(SORT_VALIDATION_EXCEPTION_MESSAGE, errors);
    }

    return sortingDto;
  },
);
