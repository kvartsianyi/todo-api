import { FilterRuleEnum, FilterTypeEnum } from '../constants';

export type QueryFilterValueType = string | number | boolean | Date | number[];

export interface QueryFilter {
  property: string;
  rule: FilterRuleEnum;
  value: QueryFilterValueType;
}

export interface QueryFilterFieldOptions {
  type: FilterTypeEnum;
  rules?: FilterRuleEnum[];
}
