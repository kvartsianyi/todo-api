import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { parseFilterParams, pickFilterParams, validateFilters } from '../utils';
import { QueryFilter, QueryFilterFieldOptions } from '../interfaces';
import { FILTER_VALIDATION_EXCEPTION_MESSAGE } from '../constants';
import { ValidationException } from '../exceptions';

export const FilteringQuery = createParamDecorator(
  (
    filterableFieldsMap: Record<string, QueryFilterFieldOptions>,
    ctx: ExecutionContext,
  ): QueryFilter[] => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filterParams = pickFilterParams(
      req.query,
      Object.keys(filterableFieldsMap),
    );
    const filters = parseFilterParams(filterParams, filterableFieldsMap);

    const errors = validateFilters(filters, filterableFieldsMap);

    if (errors.length) {
      throw new ValidationException(
        FILTER_VALIDATION_EXCEPTION_MESSAGE,
        errors,
      );
    }

    return filters;
  },
);
