import { FilterRuleEnum } from '../constants';

export type QueryFilterValueType = string | number | boolean | Date | number[];

export interface IQueryFilter {
  property: string;
  rule: FilterRuleEnum;
  value: QueryFilterValueType;
}
