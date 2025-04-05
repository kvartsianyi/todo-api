import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

import { parseFilterParams, pickFilterParams, validateFilters } from '../utils';
import { IQueryFilter } from '../interfaces';
import { FilterRuleEnum } from '../constants';

export const FilteringQuery = createParamDecorator(
  (
    filterableFieldsMap: Record<string, FilterRuleEnum[]>,
    ctx: ExecutionContext,
  ): IQueryFilter[] => {
    const req: Request = ctx.switchToHttp().getRequest();

    const rawFilterParams = pickFilterParams(
      req.query,
      Object.keys(filterableFieldsMap),
    );
    const filters = parseFilterParams(rawFilterParams);
    const errors = validateFilters(filters, filterableFieldsMap);

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return filters;
  },
);
