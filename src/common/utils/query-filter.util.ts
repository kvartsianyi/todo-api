import { ValidationError } from 'class-validator';
import * as qs from 'qs';
import { parseISO, isValid, isDate } from 'date-fns';
import { isFinite, isBoolean, isString, isArray, toNumber } from 'lodash';

import {
  FILTER_ERRORS,
  ALLOWED_FILTER_RULES_MAP,
  FilterRuleEnum,
  FilterTypeEnum,
  generateFilterParamRegex,
} from '../constants';
import {
  QueryFilter,
  QueryFilterFieldOptions,
  QueryFilterValueType,
} from '../interfaces';

const {
  PROPERTY_RULE_NOT_SUPPORTED,
  FIELD_IS_NOT_FILTERABLE,
  INVALID_RULE_VALUE,
} = FILTER_ERRORS;

export const normalizeFilterParams = (
  query: Record<string, any>,
): Record<string, any> => {
  const normalizedQuery: Record<string, any> = {};

  for (const [key, value] of Object.entries(query)) {
    const defaultRule = '[eq]';
    const isFilterWithoutRule = key.match(/^filter\[(\w+)]$/);

    const normalizedKey = isFilterWithoutRule ? key + defaultRule : key;
    const normalizedValue = isArray(value) ? value.at(-1) : value;

    normalizedQuery[normalizedKey] = normalizedValue;
  }

  return normalizedQuery;
};

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

const transformFilterValue = (
  rule: FilterRuleEnum,
  propertyType: FilterTypeEnum,
  value: string,
): QueryFilterValueType => {
  const isArrayLikeRule = [FilterRuleEnum.IN, FilterRuleEnum.NOT_IN].includes(
    rule,
  );
  const isNullableRule = FilterRuleEnum.IS_NULL === rule;

  const transformToArray = <T>(
    value: string,
    transformFn?: (value: string) => T,
  ): (string | T)[] =>
    value.includes(',')
      ? value.split(',').map((v) => (transformFn ? transformFn(v) : v))
      : [transformFn ? transformFn(value) : value];

  const transformToBoolean = (value: string) =>
    new Map([
      ['true', true],
      ['false', false],
    ]).get(value) ?? value;

  const transformMap = {
    [FilterTypeEnum.STRING]: (value: string) => {
      if (isNullableRule) return transformToBoolean(value);
      if (isArrayLikeRule) return transformToArray<string>(value);

      return value;
    },
    [FilterTypeEnum.NUMBER]: (value: string) => {
      if (isNullableRule) return transformToBoolean(value);
      if (isArrayLikeRule) return transformToArray<number>(value, toNumber);

      return value;
    },
    [FilterTypeEnum.BOOLEAN]: (value: string) => transformToBoolean(value),
    [FilterTypeEnum.DATE]: (value: string) =>
      isNullableRule ? transformToBoolean(value) : parseISO(value),
  };

  return transformMap[propertyType](value);
};

export const parseFilterParams = (
  queryParams: Record<string, any>,
  filterableFieldsMap: Record<string, QueryFilterFieldOptions>,
): QueryFilter[] => {
  const filters: QueryFilter[] = [];

  const { filter = {} } = qs.parse(queryParams);
  const filterMap = filter as Record<string, { [key: string]: string }>;

  for (const [property] of Object.entries(filterMap)) {
    const rules = filterMap[property];
    const propertyType = filterableFieldsMap[property]?.type;

    for (const [rule, value] of Object.entries(rules)) {
      const filterRule = rule as FilterRuleEnum;

      filters.push({
        property,
        rule: filterRule,
        value: transformFilterValue(filterRule, propertyType, value),
      });
    }
  }

  return filters;
};

const isFilterValueValid = (
  rule: FilterRuleEnum,
  propertyType: FilterTypeEnum,
  value: QueryFilterValueType,
): boolean => {
  const isArrayLikeRule = [FilterRuleEnum.IN, FilterRuleEnum.NOT_IN].includes(
    rule,
  );
  const isNullableRule = FilterRuleEnum.IS_NULL === rule;

  const isArrayValid = (
    value: unknown,
    validationFn: (value: unknown) => boolean,
  ): boolean => isArray(value) && value.every(validationFn);

  const validationMap = {
    [FilterTypeEnum.STRING]: (value: QueryFilterValueType) => {
      if (isNullableRule) return isBoolean(value);
      if (isArrayLikeRule) return isArrayValid(value, isString);

      return isString(value);
    },
    [FilterTypeEnum.NUMBER]: (value: QueryFilterValueType) => {
      if (isNullableRule) return isBoolean(value);
      if (isArrayLikeRule) return isArrayValid(value, isFinite);

      return isFinite(value);
    },
    [FilterTypeEnum.BOOLEAN]: (value: QueryFilterValueType) => isBoolean(value),
    [FilterTypeEnum.DATE]: (value: QueryFilterValueType) =>
      isNullableRule ? isBoolean(value) : isDate(value) && isValid(value),
  };

  return validationMap[propertyType](value);
};

export const validateFilters = (
  filters: QueryFilter[],
  filterableFieldsMap: Record<string, QueryFilterFieldOptions>,
): ValidationError[] => {
  const buildConstraints = (rule: FilterRuleEnum, message: string) => ({
    [rule]: message,
  });
  const buildValidationError = (
    filter: QueryFilter,
    message: string,
  ): ValidationError => ({
    target: filter,
    property: filter.property,
    value: filter.value,
    constraints: buildConstraints(filter.rule, message),
  });

  const errors: ValidationError[] = [];

  for (const filter of filters) {
    const { property, rule, value } = filter;
    const field = filterableFieldsMap[property];

    if (!field) {
      errors.push(
        buildValidationError(
          filter,
          FIELD_IS_NOT_FILTERABLE(Object.keys(filterableFieldsMap)),
        ),
      );
      continue;
    }

    const { type, rules } = field;
    const allowedRules = rules ?? ALLOWED_FILTER_RULES_MAP[type];

    if (!allowedRules.includes(rule)) {
      errors.push(
        buildValidationError(
          filter,
          PROPERTY_RULE_NOT_SUPPORTED(rule, property, allowedRules),
        ),
      );
    }

    if (!isFilterValueValid(rule, type, value)) {
      errors.push(buildValidationError(filter, INVALID_RULE_VALUE(rule)));
    }
  }

  return errors;
};
