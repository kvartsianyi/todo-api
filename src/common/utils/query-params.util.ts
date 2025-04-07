import * as qs from 'qs';

import {
  ALLOWED_TYPES_BY_RULES,
  FILTER_ERRORS,
  FilterRuleEnum,
  generateFilterParamRegex,
} from '../constants';
import { IQueryFilter, QueryFilterValueType } from '../interfaces';
import { getFilterPropertyType, parseObject } from './type.util';
import { ValidationError } from 'class-validator';

const { PROPERTY_RULE_NOT_SUPPORTED, INVALID_RULE_VALUE } = FILTER_ERRORS;

export const pickFilterParams = (
  queryParams: Record<string, any>,
  fields: string[],
): Record<string, any> => {
  const filterParamRegex = generateFilterParamRegex(fields);

  const filterParams = Object.entries(queryParams).reduce(
    (acc, [key, value]) =>
      filterParamRegex.test(key) ? { ...acc, [key]: value } : acc,
    {},
  );

  return filterParams;
};

export const parseFilterParams = (
  queryParams: Record<string, any>,
): IQueryFilter[] => {
  const { filter: filterData } = qs.parse(queryParams, { comma: true });
  const filterParams = parseObject(filterData as Record<string, any>);

  const filters: IQueryFilter[] = [];

  for (const [property, operationsData] of Object.entries(filterParams)) {
    Object.entries(operationsData).forEach(([rule, value]) =>
      filters.push({
        property,
        rule: rule as FilterRuleEnum,
        value: value as QueryFilterValueType,
      }),
    );
  }

  return filters;
};

export const validateFilters = (
  filters: IQueryFilter[],
  filterableFieldsMap: Record<string, FilterRuleEnum[]>,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  for (const filter of filters) {
    const { property, rule, value } = filter;
    const allowedRules = filterableFieldsMap[property];
    const type = getFilterPropertyType(value);

    if (!allowedRules.includes(rule)) {
      errors.push({
        target: filter,
        property,
        value,
        constraints: {
          [rule]: PROPERTY_RULE_NOT_SUPPORTED(rule, property, allowedRules),
        },
      });
    }

    if (!ALLOWED_TYPES_BY_RULES[rule].includes(type)) {
      errors.push({
        target: filter,
        property,
        value,
        constraints: {
          [rule]: INVALID_RULE_VALUE(rule),
        },
      });
    }
  }

  return errors;
};
