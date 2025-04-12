import {
  ILike,
  In,
  Equal,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ObjectLiteral,
  SelectQueryBuilder,
  IsNull,
} from 'typeorm';

import { PaginationDto, SortingDto } from '../dtos';
import {
  FILTER_ERRORS,
  FilterRuleEnum,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_SIZE,
} from '../constants';
import { IPaginatedResource, QueryFilter } from '../interfaces';

export const createEnumTypeQuery = (
  typeName: string,
  values: string[],
): string => {
  const formattedValues = values.map((value) => `'${value}'`).join(', ');

  return `CREATE TYPE "${typeName}" AS ENUM (${formattedValues})`;
};

export const dropEnumTypeQuery = (typeName: string): string => {
  return `DROP TYPE "${typeName}"`;
};

export const paginateQuery = async <T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  {
    page = PAGINATION_DEFAULT_PAGE,
    size = PAGINATION_DEFAULT_SIZE,
  }: PaginationDto,
): Promise<IPaginatedResource<T>> => {
  const [data, total] = await qb
    .take(size)
    .skip((page - 1) * size)
    .getManyAndCount();

  return {
    data,
    page,
    size,
    total,
  };
};

export const applySorting = <T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  { sortBy, orderBy }: SortingDto,
): SelectQueryBuilder<T> => (sortBy ? qb.orderBy(sortBy, orderBy) : qb);

export const applyFilters = <T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  filters: QueryFilter[],
): SelectQueryBuilder<T> => {
  if (!filters?.length) return qb;

  for (const { property, rule, value } of filters) {
    switch (rule) {
      case FilterRuleEnum.EQUALS:
        qb.andWhere({ [property]: Equal(value) });
        break;
      case FilterRuleEnum.NOT_EQUALS:
        qb.andWhere({ [property]: Not(value) });
        break;
      case FilterRuleEnum.GREATER_THAN:
        qb.andWhere({ [property]: MoreThan(value) });
        break;
      case FilterRuleEnum.GREATER_THAN_OR_EQUALS:
        qb.andWhere({ [property]: MoreThanOrEqual(value) });
        break;
      case FilterRuleEnum.LESS_THAN:
        qb.andWhere({ [property]: LessThan(value) });
        break;
      case FilterRuleEnum.LESS_THAN_OR_EQUALS:
        qb.andWhere({ [property]: LessThanOrEqual(value) });
        break;
      case FilterRuleEnum.LIKE:
        if (typeof value !== 'string') break;
        qb.andWhere({ [property]: ILike(`%${value}%`) });
        break;
      case FilterRuleEnum.NOT_LIKE:
        if (typeof value !== 'string') break;
        qb.andWhere({ [property]: Not(ILike(`%${value}%`)) });
        break;
      case FilterRuleEnum.IN:
        if (!Array.isArray(value)) break;
        qb.andWhere({ [property]: In(value) });
        break;
      case FilterRuleEnum.NOT_IN:
        if (!Array.isArray(value)) break;
        qb.andWhere({ [property]: Not(In(value)) });
        break;
      case FilterRuleEnum.IS_NULL:
        qb.andWhere({ [property]: value ? IsNull() : Not(IsNull()) });
        break;
      default:
        throw new Error(FILTER_ERRORS.RULE_NOT_SUPPORTED);
    }
  }

  return qb;
};
