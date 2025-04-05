export enum SortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const SORTING_DEFAULT_DIRECTION = SortOrderEnum.ASC;

export enum FilterRuleEnum {
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
}

export enum FilterTypeEnum {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  OBJECT = 'object',
  ARRAY = 'array',
}

export const generateFilterParamRegex = (fields: string[]): RegExp =>
  new RegExp(
    `^filter\\[(${fields.join('|')})\\]\\[(${Object.values(FilterRuleEnum).join('|')})\\]$`,
  );

export const FILTER_RULES_BY_TYPES: Record<string, FilterRuleEnum[]> = {
  [FilterTypeEnum.STRING]: [
    FilterRuleEnum.EQUALS,
    FilterRuleEnum.NOT_EQUALS,
    FilterRuleEnum.LIKE,
    FilterRuleEnum.NOT_LIKE,
  ],
  [FilterTypeEnum.NUMBER]: [
    FilterRuleEnum.EQUALS,
    FilterRuleEnum.NOT_EQUALS,
    FilterRuleEnum.GREATER_THAN,
    FilterRuleEnum.GREATER_THAN_OR_EQUALS,
    FilterRuleEnum.LESS_THAN,
    FilterRuleEnum.LESS_THAN_OR_EQUALS,
  ],
  [FilterTypeEnum.BOOLEAN]: [FilterRuleEnum.EQUALS, FilterRuleEnum.NOT_EQUALS],
  [FilterTypeEnum.DATE]: [
    FilterRuleEnum.EQUALS,
    FilterRuleEnum.NOT_EQUALS,
    FilterRuleEnum.GREATER_THAN,
    FilterRuleEnum.GREATER_THAN_OR_EQUALS,
    FilterRuleEnum.LESS_THAN,
    FilterRuleEnum.LESS_THAN_OR_EQUALS,
  ],
  [FilterTypeEnum.ARRAY]: [FilterRuleEnum.IN, FilterRuleEnum.NOT_IN],
};

export const ALLOWED_TYPES_BY_RULES: Record<FilterRuleEnum, string[]> = {
  [FilterRuleEnum.EQUALS]: [
    FilterTypeEnum.STRING,
    FilterTypeEnum.NUMBER,
    FilterTypeEnum.BOOLEAN,
    FilterTypeEnum.DATE,
  ],
  [FilterRuleEnum.NOT_EQUALS]: [
    FilterTypeEnum.STRING,
    FilterTypeEnum.NUMBER,
    FilterTypeEnum.BOOLEAN,
    FilterTypeEnum.DATE,
  ],
  [FilterRuleEnum.GREATER_THAN]: [FilterTypeEnum.NUMBER, FilterTypeEnum.DATE],
  [FilterRuleEnum.GREATER_THAN_OR_EQUALS]: [
    FilterTypeEnum.NUMBER,
    FilterTypeEnum.DATE,
  ],
  [FilterRuleEnum.LESS_THAN]: [FilterTypeEnum.NUMBER, FilterTypeEnum.DATE],
  [FilterRuleEnum.LESS_THAN_OR_EQUALS]: [
    FilterTypeEnum.NUMBER,
    FilterTypeEnum.DATE,
  ],
  [FilterRuleEnum.LIKE]: [FilterTypeEnum.STRING],
  [FilterRuleEnum.NOT_LIKE]: [FilterTypeEnum.STRING],
  [FilterRuleEnum.IN]: [FilterTypeEnum.ARRAY],
  [FilterRuleEnum.NOT_IN]: [FilterTypeEnum.ARRAY],
};
