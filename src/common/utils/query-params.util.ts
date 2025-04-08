import { ValidationError } from 'class-validator';

import {
  ALLOWED_TYPES_BY_RULES,
  FILTER_ERRORS,
  FILTER_RULES_BY_TYPES,
  FilterRuleEnum,
  FilterTypeEnum,
  generateFilterParamRegex,
  SQUARE_BRACKETS_VALUE_REGEX,
} from '../constants';
import { IQueryFilter, QueryFilterValueType } from '../interfaces';
import { getFilterPropertyType, parseValue } from './type.util';

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
  const filters: IQueryFilter[] = [];

  for (const [rawFilter, value] of Object.entries(queryParams)) {
    let parsedValue: QueryFilterValueType = value;
    const [property, rule = FilterRuleEnum.EQUALS] = [
      ...rawFilter.matchAll(SQUARE_BRACKETS_VALUE_REGEX),
    ].map((match) => match[1]);

    const isArrayTypeRule = FILTER_RULES_BY_TYPES[
      FilterTypeEnum.ARRAY
    ].includes(rule as FilterRuleEnum);

    if (isArrayTypeRule && value.includes(',')) {
      parsedValue = value.split(',');
    }

    filters.push({
      property,
      rule: rule as FilterRuleEnum,
      value: parseValue(parsedValue) as QueryFilterValueType,
    });
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
