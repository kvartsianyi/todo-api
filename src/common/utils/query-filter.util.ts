import { ValidationError } from 'class-validator';
import { parseISO, isValid, isDate } from 'date-fns';
import {
  isFinite,
  isBoolean,
  isString,
  isArray,
  toNumber,
  isObject,
} from 'lodash';

import {
  FILTER_ERRORS,
  ALLOWED_FILTER_RULES_MAP,
  FilterRuleEnum,
  FilterTypeEnum,
  QUERY_FILTER_DEFAULT_RULE,
} from '../constants';
import {
  EnumFilterField,
  QueryFilter,
  QueryFilterFieldOptions,
  QueryFilterValueType,
} from '../interfaces';

const {
  PROPERTY_RULE_NOT_SUPPORTED,
  FIELD_IS_NOT_FILTERABLE,
  INVALID_RULE_VALUE,
} = FILTER_ERRORS;

export const pickFilterParams = (
  queryParams: Record<string, any>,
  fields: string[],
): Record<string, { [key: string]: string }> => {
  const filterParams: Record<string, { [key: string]: string }> = {};

  const getQueryParamValue = (value: string | Array<string>): string =>
    isArray(value) ? (value.at(-1) as string) : value;

  for (const [field, rulesOrValue] of Object.entries(queryParams)) {
    if (!fields.includes(field)) continue;

    const includeRules = isObject(rulesOrValue) && !isArray(rulesOrValue);
    if (!includeRules) {
      filterParams[field] = {
        [QUERY_FILTER_DEFAULT_RULE]: getQueryParamValue(rulesOrValue),
      };
      continue;
    }

    const allowedRules = Object.values(FilterRuleEnum);
    const normalizedRulesEntries = Object.entries(rulesOrValue)
      .filter(([rule]) => allowedRules.includes(rule as FilterRuleEnum))
      .map(([rule, value]) => [rule, getQueryParamValue(value as string)]);

    filterParams[field] = Object.fromEntries(normalizedRulesEntries);
  }

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

  const transformToArray = <T = string>(
    value: string,
    transformFn: (value: string) => T = (v) => v as unknown as T,
  ): T[] =>
    value.includes(',')
      ? value.split(',').map((v) => transformFn(v))
      : [transformFn(value)];

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

      return toNumber(value);
    },
    [FilterTypeEnum.BOOLEAN]: (value: string) => transformToBoolean(value),
    [FilterTypeEnum.DATE]: (value: string) =>
      isNullableRule ? transformToBoolean(value) : parseISO(value),
    [FilterTypeEnum.ENUM]: (value: string) =>
      isArrayLikeRule ? transformToArray<string>(value) : value,
  };

  return transformMap[propertyType](value);
};

export const parseFilterParams = (
  queryParams: Record<string, { [key: string]: string }>,
  filterableFieldsMap: Record<string, QueryFilterFieldOptions>,
): QueryFilter[] => {
  const filters: QueryFilter[] = [];

  for (const [property] of Object.entries(queryParams)) {
    const rules = queryParams[property];
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
  fieldOptions: QueryFilterFieldOptions,
  rule: FilterRuleEnum,
  value: QueryFilterValueType,
): boolean => {
  const { type: fieldType } = fieldOptions;

  const isArrayLikeRule = [FilterRuleEnum.IN, FilterRuleEnum.NOT_IN].includes(
    rule,
  );
  const isNullableRule = FilterRuleEnum.IS_NULL === rule;

  const isArrayValid = (
    value: unknown,
    validationFn: (value: unknown) => boolean,
  ): boolean => isArray(value) && value.every(validationFn);
  const isInEnum = (value: string): boolean =>
    (fieldOptions as EnumFilterField).enum.includes(value);

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
    [FilterTypeEnum.ENUM]: (value: QueryFilterValueType) =>
      isArrayLikeRule
        ? isArray(value) && value.every(isInEnum)
        : isInEnum(value as string),
  };

  return validationMap[fieldType](value);
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

    if (!isFilterValueValid(field, rule, value)) {
      errors.push(buildValidationError(filter, INVALID_RULE_VALUE(rule)));
    }
  }

  return errors;
};
