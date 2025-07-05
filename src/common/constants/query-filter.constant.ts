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
  IS_NULL = 'isnull',
}

export enum FilterTypeEnum {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  ENUM = 'enum',
}

export const ALLOWED_FILTER_RULES_MAP: Record<string, FilterRuleEnum[]> = {
  [FilterTypeEnum.STRING]: [
    FilterRuleEnum.EQUALS,
    FilterRuleEnum.NOT_EQUALS,
    FilterRuleEnum.LIKE,
    FilterRuleEnum.NOT_LIKE,
    FilterRuleEnum.IN,
    FilterRuleEnum.NOT_IN,
    FilterRuleEnum.IS_NULL,
  ],
  [FilterTypeEnum.NUMBER]: [
    FilterRuleEnum.EQUALS,
    FilterRuleEnum.NOT_EQUALS,
    FilterRuleEnum.GREATER_THAN,
    FilterRuleEnum.GREATER_THAN_OR_EQUALS,
    FilterRuleEnum.LESS_THAN,
    FilterRuleEnum.LESS_THAN_OR_EQUALS,
    FilterRuleEnum.IN,
    FilterRuleEnum.NOT_IN,
    FilterRuleEnum.IS_NULL,
  ],
  [FilterTypeEnum.BOOLEAN]: [FilterRuleEnum.EQUALS, FilterRuleEnum.NOT_EQUALS],
  [FilterTypeEnum.DATE]: [
    FilterRuleEnum.EQUALS,
    FilterRuleEnum.NOT_EQUALS,
    FilterRuleEnum.GREATER_THAN,
    FilterRuleEnum.GREATER_THAN_OR_EQUALS,
    FilterRuleEnum.LESS_THAN,
    FilterRuleEnum.LESS_THAN_OR_EQUALS,
    FilterRuleEnum.IS_NULL,
  ],
  [FilterTypeEnum.ENUM]: [
    FilterRuleEnum.EQUALS,
    FilterRuleEnum.NOT_EQUALS,
    FilterRuleEnum.IN,
    FilterRuleEnum.NOT_IN,
  ],
};

export const QUERY_FILTER_DEFAULT_RULE = FilterRuleEnum.EQUALS;
